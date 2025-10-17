'use client'

import { Icon } from '@iconify/react'
import { ProfileSocialId, SocialPlatform } from '@/types/custom'

interface SocialIdItemProps {
  socialId: ProfileSocialId
  index: number
  isGlobalEditMode: boolean
  socialPlatforms: SocialPlatform[]
  onUpdate: (index: number, field: keyof ProfileSocialId, value: string) => void
  onRemove: (index: number) => void
}

export default function SocialIdItem({
  socialId,
  index,
  isGlobalEditMode,
  socialPlatforms,
  onUpdate,
  onRemove,
}: SocialIdItemProps) {
  if (isGlobalEditMode) {
    return (
      <div className='flex items-center space-x-3'>
        <select
          value={socialId.platform_code}
          onChange={(e) => onUpdate(index, 'platform_code', e.target.value)}
          className='px-3 py-2 border border-border rounded-md bg-background text-foreground'
        >
          <option value=''>Select platform</option>
          {socialPlatforms.map((platform) => (
            <option key={platform.code} value={platform.code}>
              {platform.display_name}
            </option>
          ))}
        </select>
        <input
          type='text'
          value={socialId.social_id || ''}
          onChange={(e) => onUpdate(index, 'social_id', e.target.value)}
          className='flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground'
          placeholder='Username or ID'
        />
        <button
          onClick={() => onRemove(index)}
          className='p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors'
        >
          <Icon icon='ph:trash-duotone' width={20} />
        </button>
      </div>
    )
  }

  const platform = socialPlatforms.find(
    (p) => p.code === socialId.platform_code
  )
  const profileUrl =
    platform?.profile_url_format && socialId.social_id
      ? platform.profile_url_format.replace('{social_id}', socialId.social_id)
      : null

  return (
    <div className='flex items-center space-x-3'>
      <span className='font-medium text-foreground'>
        {platform?.display_name || socialId.platform_code}
      </span>
      <span className='text-muted-foreground'>:</span>
      {profileUrl ? (
        <a
          href={profileUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary hover:underline'
        >
          {socialId.social_id}
        </a>
      ) : (
        <span className='text-foreground'>{socialId.social_id}</span>
      )}
    </div>
  )
}
