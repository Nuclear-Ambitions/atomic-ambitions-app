'use client'

import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import {
  ProfileResponse,
  ProfileData,
  ProfileFavorite,
  ProfileSocialId,
} from '@/types/custom'
import ProfileSection from './ProfileSection'
import ProfileField from './ProfileField'
import ProfileListSection from './ProfileListSection'
import FavoriteItem from './FavoriteItem'
import SocialIdItem from './SocialIdItem'

export default function ProfilePage() {
  const session = useSession()
  const user = session.data?.user
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [fieldSaving, setFieldSaving] = useState<Record<string, boolean>>({})

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        if (response.ok) {
          const data = await response.json()
          setProfileData(data)
          // Check if profile is published by trying to fetch it publicly
          if (data.profile.handle) {
            try {
              const publicResponse = await fetch(
                `/api/profile/public/${data.profile.handle}`
              )
              setIsPublished(publicResponse.ok)
            } catch {
              setIsPublished(false)
            }
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session.status === 'authenticated') {
      loadProfile()
    }
  }, [session.status])

  const handleSave = async () => {
    if (!profileData) return

    setSaving(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: profileData.profile,
          favorites: profileData.favorites,
          socialIds: profileData.socialIds,
        }),
      })

      if (response.ok) {
        setIsEditing(false)
      } else {
        console.error('Error saving profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const togglePublish = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !isPublished }),
      })

      if (response.ok) {
        setIsPublished(!isPublished)
      } else {
        console.error('Error toggling publish status')
      }
    } catch (error) {
      console.error('Error toggling publish status:', error)
    }
  }

  const addFavorite = () => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      favorites: [
        ...profileData.favorites,
        {
          label: '',
          url: '',
          explanation: '',
          order: profileData.favorites.length,
        },
      ],
    })
  }

  const removeFavorite = (index: number) => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      favorites: profileData.favorites.filter((_, i) => i !== index),
    })
  }

  const updateFavorite = (
    index: number,
    field: keyof ProfileFavorite,
    value: string | number
  ) => {
    if (!profileData) return
    const updatedFavorites = [...profileData.favorites]
    updatedFavorites[index] = { ...updatedFavorites[index], [field]: value }
    setProfileData({ ...profileData, favorites: updatedFavorites })
  }

  const addSocialId = () => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      socialIds: [
        ...profileData.socialIds,
        { platform_code: '', social_id: '' },
      ],
    })
  }

  const removeSocialId = (index: number) => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      socialIds: profileData.socialIds.filter((_, i) => i !== index),
    })
  }

  const updateSocialId = (
    index: number,
    field: keyof ProfileSocialId,
    value: string
  ) => {
    if (!profileData) return
    const updatedSocialIds = [...profileData.socialIds]
    updatedSocialIds[index] = { ...updatedSocialIds[index], [field]: value }
    setProfileData({ ...profileData, socialIds: updatedSocialIds })
  }

  const updateProfileField = (field: keyof ProfileData, value: string) => {
    if (!profileData) return
    setProfileData({
      ...profileData,
      profile: { ...profileData.profile, [field]: value },
    })
  }

  // Field-level save function for inline editing
  const saveField = async (field: string, value: string) => {
    if (!profileData) return

    setFieldSaving((prev) => ({ ...prev, [field]: true }))
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, value }),
      })

      if (response.ok) {
        // Update local state
        if (['alias', 'handle'].includes(field)) {
          setProfileData({
            ...profileData,
            profile: { ...profileData.profile, [field]: value },
          })
        } else {
          setProfileData({
            ...profileData,
            profile: { ...profileData.profile, [field]: value },
          })
        }
      } else {
        throw new Error('Failed to save field')
      }
    } catch (error) {
      console.error('Error saving field:', error)
      throw error
    } finally {
      setFieldSaving((prev) => ({ ...prev, [field]: false }))
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <Icon
            icon='ph:spinner-duotone'
            width={48}
            className='animate-spin text-primary mx-auto mb-4'
          />
          <p className='text-muted-foreground'>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Profile Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-4'>
              {profileData?.profile.avatar_url ? (
                <Image
                  src={profileData.profile.avatar_url}
                  width={80}
                  height={80}
                  alt={user?.name || profileData.profile.alias || 'Profile'}
                  className='w-20 h-20 rounded-full object-cover border-4 border-primary'
                />
              ) : (
                <div className='w-20 h-20 rounded-full bg-gradient-to-br from-cherenkov to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold'>
                  {user?.name
                    ? user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    : profileData?.profile.alias?.[0] || 'U'}
                </div>
              )}
              <div>
                <h1 className='text-3xl font-bold text-foreground flex items-center'>
                  <Icon
                    icon='ph:user-circle-duotone'
                    width={32}
                    className='mr-3 text-primary'
                  />
                  Atomic Profile
                </h1>
                <div>
                  <p className='text-muted-foreground'>
                    {isEditing
                      ? 'Edit your public profile'
                      : 'Manage your account information and preferences'}
                  </p>
                  {profileData?.profile.handle && (
                    <div className='flex items-center mt-2 space-x-2'>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isPublished ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      <span className='text-sm text-muted-foreground'>
                        {isPublished
                          ? 'Profile is public'
                          : 'Profile is private'}
                      </span>
                      {isPublished && (
                        <a
                          href={`/whos-who/${profileData.profile.handle}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm text-primary hover:underline'
                        >
                          View public profile
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex space-x-2'>
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className='px-4 py-2 text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50'
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={togglePublish}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      isPublished
                        ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {profileData && (
          <div className='space-y-8'>
            {/* Basic Information */}
            <ProfileSection icon='ph:user-duotone' title='Basic Information'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <ProfileField
                  label='Alias'
                  value={profileData.profile.alias || ''}
                  onSave={(value) => saveField('alias', value)}
                  isGlobalEditMode={isEditing}
                  placeholder='Your alias'
                />
                <ProfileField
                  label='Handle'
                  value={profileData.profile.handle || ''}
                  onSave={(value) => saveField('handle', value)}
                  isGlobalEditMode={isEditing}
                  placeholder='@yourhandle'
                />
                <ProfileField
                  label='Location'
                  value={profileData.profile.location || ''}
                  onSave={(value) => saveField('location', value)}
                  isGlobalEditMode={isEditing}
                  placeholder='Your location'
                />
                <ProfileField
                  label='Website'
                  value={profileData.profile.own_website || ''}
                  onSave={(value) => saveField('own_website', value)}
                  isGlobalEditMode={isEditing}
                  type='url'
                  placeholder='https://yourwebsite.com'
                />
              </div>
            </ProfileSection>

            {/* Bio */}
            <ProfileSection icon='ph:file-text-duotone' title='Bio'>
              <ProfileField
                label=''
                value={profileData.profile.bio || ''}
                onSave={(value) => saveField('bio', value)}
                isGlobalEditMode={isEditing}
                type='textarea'
                placeholder='Tell us about yourself...'
                multiline={true}
              />
            </ProfileSection>

            {/* Why Joined & Why Nuclear */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <ProfileSection icon='ph:heart-duotone' title='Why I Joined'>
                <ProfileField
                  label=''
                  value={profileData.profile.why_joined || ''}
                  onSave={(value) => saveField('why_joined', value)}
                  isGlobalEditMode={isEditing}
                  type='textarea'
                  placeholder='What brought you to Atomic Ambitions?'
                  multiline={true}
                />
              </ProfileSection>
              <ProfileSection icon='ph:atom-duotone' title='Why Nuclear'>
                <ProfileField
                  label=''
                  value={profileData.profile.why_nuclear || ''}
                  onSave={(value) => saveField('why_nuclear', value)}
                  isGlobalEditMode={isEditing}
                  type='textarea'
                  placeholder='What draws you to nuclear energy?'
                  multiline={true}
                />
              </ProfileSection>
            </div>

            {/* Favorites */}
            <ProfileListSection
              icon='ph:star-duotone'
              title='Favorites'
              items={profileData.favorites}
              isGlobalEditMode={isEditing}
              onAdd={addFavorite}
              onRemove={removeFavorite}
              renderView={(favorite, index) => (
                <FavoriteItem
                  favorite={favorite}
                  index={index}
                  isGlobalEditMode={false}
                  onUpdate={updateFavorite}
                  onRemove={removeFavorite}
                />
              )}
              renderEdit={(favorite, index) => (
                <FavoriteItem
                  favorite={favorite}
                  index={index}
                  isGlobalEditMode={true}
                  onUpdate={updateFavorite}
                  onRemove={removeFavorite}
                />
              )}
              emptyMessage='No favorites added yet'
              addButtonText='Add Favorite'
            />

            {/* Social IDs */}
            <ProfileListSection
              icon='ph:share-network-duotone'
              title='Social Links'
              items={profileData.socialIds}
              isGlobalEditMode={isEditing}
              onAdd={addSocialId}
              onRemove={removeSocialId}
              renderView={(socialId, index) => (
                <SocialIdItem
                  socialId={socialId}
                  index={index}
                  isGlobalEditMode={false}
                  socialPlatforms={profileData.socialPlatforms}
                  onUpdate={updateSocialId}
                  onRemove={removeSocialId}
                />
              )}
              renderEdit={(socialId, index) => (
                <SocialIdItem
                  socialId={socialId}
                  index={index}
                  isGlobalEditMode={true}
                  socialPlatforms={profileData.socialPlatforms}
                  onUpdate={updateSocialId}
                  onRemove={removeSocialId}
                />
              )}
              emptyMessage='No social links added yet'
              addButtonText='Add Social Link'
            />
          </div>
        )}
      </div>
    </div>
  )
}
