'use client'

import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
import {
  ProfileFavorite,
  ProfileSocialId,
  SocialPlatform,
} from '@/types/custom'
import FavoriteItem from './FavoriteItem'
import SocialIdItem from './SocialIdItem'

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (item: ProfileFavorite | ProfileSocialId) => void
  type: 'favorite' | 'socialId'
  socialPlatforms?: SocialPlatform[]
}

export default function AddItemModal({
  isOpen,
  onClose,
  onSave,
  type,
  socialPlatforms = [],
}: AddItemModalProps) {
  const [newFavorite, setNewFavorite] = useState<ProfileFavorite>({
    label: '',
    url: '',
    explanation: '',
    order: 0,
  })
  const [newSocialId, setNewSocialId] = useState<ProfileSocialId>({
    platform_code: '',
    social_id: '',
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (type === 'favorite') {
        setNewFavorite({
          label: '',
          url: '',
          explanation: '',
          order: 0,
        })
      } else {
        setNewSocialId({
          platform_code: '',
          social_id: '',
        })
      }
    }
  }, [isOpen, type])

  const handleSave = () => {
    if (type === 'favorite') {
      // Validate favorite
      if (!newFavorite.label?.trim()) {
        return
      }
      onSave(newFavorite)
    } else {
      // Validate social ID
      if (!newSocialId.platform_code || !newSocialId.social_id?.trim()) {
        return
      }
      onSave(newSocialId)
    }
    onClose()
  }

  const updateFavorite = (
    index: number,
    field: keyof ProfileFavorite,
    value: string | number
  ) => {
    setNewFavorite((prev) => ({ ...prev, [field]: value }))
  }

  const updateSocialId = (
    index: number,
    field: keyof ProfileSocialId,
    value: string
  ) => {
    setNewSocialId((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    if (type === 'favorite') {
      return newFavorite.label?.trim()
    } else {
      return newSocialId.platform_code && newSocialId.social_id?.trim()
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-background border border-border rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-border'>
          <h2 className='text-xl font-semibold text-foreground flex items-center'>
            <Icon
              icon={
                type === 'favorite'
                  ? 'ph:star-duotone'
                  : 'ph:share-network-duotone'
              }
              width={24}
              className='mr-2 text-primary'
            />
            Add {type === 'favorite' ? 'Favorite' : 'Social Link'}
          </h2>
          <button
            onClick={onClose}
            className='p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors'
          >
            <Icon icon='ph:x-duotone' width={20} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          {type === 'favorite' ? (
            <FavoriteItem
              favorite={newFavorite}
              index={0}
              isGlobalEditMode={true}
              onUpdate={updateFavorite}
            />
          ) : (
            <SocialIdItem
              socialId={newSocialId}
              index={0}
              isGlobalEditMode={true}
              socialPlatforms={socialPlatforms}
              onUpdate={updateSocialId}
            />
          )}
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end space-x-3 p-6 border-t border-border'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-muted-foreground hover:text-foreground transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid()}
            className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Add {type === 'favorite' ? 'Favorite' : 'Social Link'}
          </button>
        </div>
      </div>
    </div>
  )
}
