'use client'

import { Icon } from '@iconify/react'
import { ProfileFavorite } from '@/types/custom'

interface FavoriteItemProps {
  favorite: ProfileFavorite
  index: number
  isGlobalEditMode: boolean
  onUpdate: (
    index: number,
    field: keyof ProfileFavorite,
    value: string | number
  ) => void
}

export default function FavoriteItem({
  favorite,
  index,
  isGlobalEditMode,
  onUpdate,
}: FavoriteItemProps) {
  if (isGlobalEditMode) {
    return (
      <div className='space-y-3'>
        <input
          type='text'
          value={favorite.label || ''}
          onChange={(e) => onUpdate(index, 'label', e.target.value)}
          className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
          placeholder='Favorite name'
        />
        <input
          type='url'
          value={favorite.url || ''}
          onChange={(e) => onUpdate(index, 'url', e.target.value)}
          className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
          placeholder='https://example.com'
        />
        <textarea
          value={favorite.explanation || ''}
          onChange={(e) => onUpdate(index, 'explanation', e.target.value)}
          className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
          placeholder='Why is this a favorite?'
          rows={2}
        />
      </div>
    )
  }

  return (
    <div>
      <h3 className='font-medium text-foreground'>{favorite.label}</h3>
      {favorite.url && (
        <a
          href={favorite.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary hover:underline text-sm'
        >
          {favorite.url}
        </a>
      )}
      {favorite.explanation && (
        <p className='text-muted-foreground text-sm mt-1'>
          {favorite.explanation}
        </p>
      )}
    </div>
  )
}
