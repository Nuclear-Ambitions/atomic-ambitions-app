'use client'

import { Icon } from '@iconify/react'
import { useState, useRef, useEffect, useCallback } from 'react'

interface HandleFieldProps {
  label: string
  value: string
  onSave: (value: string) => Promise<void>
  isGlobalEditMode: boolean
  placeholder?: string
  className?: string
}

type ValidationState = 'idle' | 'checking' | 'valid' | 'invalid' | 'error'

export default function HandleField({
  label,
  value,
  onSave,
  isGlobalEditMode,
  placeholder = '@yourhandle',
  className = '',
}: HandleFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [validationState, setValidationState] =
    useState<ValidationState>('idle')
  const [validationMessage, setValidationMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null)

  // Update edit value when prop value changes
  useEffect(() => {
    setEditValue(value)
    setValidationState('idle')
    setValidationMessage('')
  }, [value])

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Debounced handle validation
  const validateHandle = useCallback(async (handle: string) => {
    if (!handle.trim()) {
      setValidationState('idle')
      setValidationMessage('')
      return
    }

    // Check URL-safe characters
    const handleRegex = /^[a-zA-Z0-9_-]+$/
    if (!handleRegex.test(handle)) {
      setValidationState('invalid')
      setValidationMessage(
        'Handle can only contain letters, numbers, underscores, and hyphens'
      )
      return
    }

    setValidationState('checking')
    setValidationMessage('Checking availability...')

    try {
      const response = await fetch('/api/profile/check-handle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.available) {
          setValidationState('valid')
          setValidationMessage('Handle is available')
        } else {
          setValidationState('invalid')
          setValidationMessage('Handle is already taken')
        }
      } else {
        setValidationState('error')
        setValidationMessage(data.error || 'Error checking handle')
      }
    } catch (error) {
      setValidationState('error')
      setValidationMessage('Error checking handle availability')
    }
  }, [])

  // Debounced validation effect
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (isEditing && editValue !== value) {
      debounceTimeoutRef.current = setTimeout(() => {
        validateHandle(editValue)
      }, 500) // 500ms debounce
    } else if (!isEditing) {
      setValidationState('idle')
      setValidationMessage('')
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [editValue, isEditing, value, validateHandle])

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

    // Don't save if handle is invalid or being checked
    if (validationState === 'invalid' || validationState === 'checking') {
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

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
    setValidationState('idle')
    setValidationMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const isEditable = isGlobalEditMode || isEditing
  const displayValue = value || 'Not set'
  const canSave =
    validationState === 'valid' ||
    (validationState === 'idle' && editValue === value)

  const getValidationIcon = () => {
    switch (validationState) {
      case 'checking':
        return (
          <Icon
            icon='ph:spinner-duotone'
            width={16}
            className='animate-spin text-blue-500'
          />
        )
      case 'valid':
        return (
          <Icon
            icon='ph:check-circle-duotone'
            width={16}
            className='text-green-500'
          />
        )
      case 'invalid':
        return (
          <Icon
            icon='ph:x-circle-duotone'
            width={16}
            className='text-red-500'
          />
        )
      case 'error':
        return (
          <Icon
            icon='ph:warning-circle-duotone'
            width={16}
            className='text-yellow-500'
          />
        )
      default:
        return null
    }
  }

  const getValidationColor = () => {
    switch (validationState) {
      case 'valid':
        return 'border-green-500 focus:border-green-500 focus:ring-green-500'
      case 'invalid':
        return 'border-red-500 focus:border-red-500 focus:ring-red-500'
      case 'error':
        return 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500'
      default:
        return 'border-border focus:border-primary focus:ring-primary'
    }
  }

  return (
    <div className={className}>
      <label className='block text-sm font-medium text-foreground mb-2'>
        {label}
      </label>

      {isEditable ? (
        <div className='relative'>
          <input
            ref={inputRef}
            type='text'
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground pr-10 ${getValidationColor()}`}
            placeholder={placeholder}
          />

          {/* Validation icon */}
          {isEditing && editValue !== value && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              {getValidationIcon()}
            </div>
          )}

          {/* Loading indicator for saving */}
          {isSaving && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <Icon
                icon='ph:spinner-duotone'
                width={16}
                className='animate-spin text-primary'
              />
            </div>
          )}

          {/* Success indicator */}
          {showSuccess && !isSaving && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <Icon
                icon='ph:check-circle-duotone'
                width={16}
                className='text-green-500'
              />
            </div>
          )}

          {/* Validation message */}
          {isEditing && editValue !== value && validationMessage && (
            <div
              className={`text-xs mt-1 ${
                validationState === 'valid'
                  ? 'text-green-600'
                  : validationState === 'invalid'
                  ? 'text-red-600'
                  : validationState === 'error'
                  ? 'text-yellow-600'
                  : 'text-blue-600'
              }`}
            >
              {validationMessage}
            </div>
          )}

          {/* Save/Cancel buttons */}
          {isEditing && (
            <div className='flex justify-end gap-2 mt-2'>
              <button
                onClick={handleCancel}
                className='px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !canSave}
                className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='group relative'>
          <p className='text-foreground whitespace-pre-wrap'>{displayValue}</p>

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
