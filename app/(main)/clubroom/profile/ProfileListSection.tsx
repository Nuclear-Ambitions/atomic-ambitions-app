'use client'

import { Icon } from '@iconify/react'
import { ReactNode } from 'react'

interface ProfileListSectionProps<T> {
  icon: string
  title: string
  items: Array<T>
  isGlobalEditMode: boolean
  onAdd: () => void
  onRemove: (index: number) => void
  renderView: (item: T, index: number) => ReactNode
  renderEdit: (item: T, index: number) => ReactNode
  emptyMessage?: string
  addButtonText?: string
}

export default function ProfileListSection<T>({
  icon,
  title,
  items,
  isGlobalEditMode,
  onAdd,
  onRemove,
  renderView,
  renderEdit,
  emptyMessage = 'No items added yet',
  addButtonText = 'Add Item',
}: ProfileListSectionProps<T>) {
  return (
    <div className='card p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-highlight flex items-center'>
          <Icon icon={icon} width={24} className='mr-2' />
          {title}
        </h2>
        {isGlobalEditMode && (
          <button
            onClick={onAdd}
            className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
          >
            {addButtonText}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className='text-muted-foreground'>{emptyMessage}</p>
      ) : (
        <div className='space-y-4'>
          {items.map((item, index) => (
            <div key={index} className='border border-border rounded-md p-4'>
              {isGlobalEditMode ? (
                <div className='space-y-3'>
                  <div className='flex justify-between items-start'>
                    <div className='flex-1'>{renderEdit(item, index)}</div>
                    <button
                      onClick={() => onRemove(index)}
                      className='ml-3 p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors'
                      title='Remove item'
                    >
                      <Icon icon='ph:trash-duotone' width={20} />
                    </button>
                  </div>
                </div>
              ) : (
                renderView(item, index)
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
