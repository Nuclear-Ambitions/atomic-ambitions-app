'use client'

import { Icon } from '@iconify/react'
import { useState, useRef, useEffect } from 'react'
import RichTextEditor from '@/components/rich-text-editor'

interface ProfileFieldProps {
  label: string
  value: string
  onSave: (value: string) => Promise<void>
  isGlobalEditMode: boolean
  type?: 'text' | 'textarea' | 'url' | 'richtext'
  placeholder?: string
  multiline?: boolean
  className?: string
}

export default function ProfileField({
  label,
  value,
  onSave,
  isGlobalEditMode,
  type = 'text',
  placeholder,
  multiline = false,
  className = '',
}: ProfileFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Update edit value when prop value changes
  useEffect(() => {
    setEditValue(value)
  }, [value])

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (type === 'textarea') {
        inputRef.current.select()
      }
    }
  }, [isEditing, type])

  const handleEdit = () => {
    if (!isGlobalEditMode) {
      setIsEditing(true)
      setEditValue(value)
    }
  }

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    try {
      await onSave(editValue)
      setIsEditing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error('Error saving field:', error)
      // Reset to original value on error
      setEditValue(value)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRichTextChange = (content: string) => {
    setEditValue(content)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const isEditable = isGlobalEditMode || isEditing
  const displayValue = value || 'Not set'

  return (
    <div className={className}>
      <label className='block text-sm font-medium text-foreground mb-2'>
        {label}
      </label>

      {isEditable ? (
        <div className='relative'>
          {type === 'richtext' ? (
            <div className='relative'>
              <RichTextEditor
                content={editValue}
                onChange={handleRichTextChange}
                placeholder={placeholder}
                editable={true}
              />
              {/* Loading indicator for rich text */}
              {isSaving && (
                <div className='absolute top-2 right-2 z-10'>
                  <Icon
                    icon='ph:spinner-duotone'
                    width={16}
                    className='animate-spin text-primary bg-background rounded-full p-1'
                  />
                </div>
              )}
              {/* Success indicator for rich text */}
              {showSuccess && !isSaving && (
                <div className='absolute top-2 right-2 z-10'>
                  <Icon
                    icon='ph:check-circle-duotone'
                    width={16}
                    className='text-green-500 bg-background rounded-full p-1'
                  />
                </div>
              )}
              {/* Save/Cancel buttons for rich text */}
              <div className='flex justify-end gap-2 mt-2'>
                <button
                  onClick={handleCancel}
                  className='px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50'
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ) : type === 'textarea' ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground min-h-[100px]'
              placeholder={placeholder}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
              placeholder={placeholder}
            />
          )}

          {/* Loading indicator for non-rich text */}
          {type !== 'richtext' && isSaving && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <Icon
                icon='ph:spinner-duotone'
                width={16}
                className='animate-spin text-primary'
              />
            </div>
          )}

          {/* Success indicator for non-rich text */}
          {type !== 'richtext' && showSuccess && !isSaving && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <Icon
                icon='ph:check-circle-duotone'
                width={16}
                className='text-green-500'
              />
            </div>
          )}
        </div>
      ) : (
        <div className='group relative'>
          {type === 'richtext' && value ? (
            <div
              className='prose prose-sm max-w-none text-foreground'
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <p className='text-foreground whitespace-pre-wrap'>
              {type === 'url' && value ? (
                <a
                  href={value}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  {value}
                </a>
              ) : (
                displayValue
              )}
            </p>
          )}

          {/* Edit button - only show in non-global edit mode */}
          {!isGlobalEditMode && (
            <button
              onClick={handleEdit}
              className='absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-foreground'
              title='Edit field'
            >
              <Icon icon='ph:pencil-duotone' width={16} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
