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

export default function ProfilePage() {
  const session = useSession()
  const user = session.data?.user
  const profile = user?.summary
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

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
            <div className='card p-6'>
              <h2 className='text-xl font-semibold text-highlight mb-4 flex items-center'>
                <Icon icon='ph:user-duotone' width={24} className='mr-2' />
                Basic Information
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Alias
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={profileData.profile.alias || ''}
                      onChange={(e) =>
                        updateProfileField('alias', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
                      placeholder='Your alias'
                    />
                  ) : (
                    <p className='text-foreground'>
                      {profileData.profile.alias || 'Not set'}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Handle
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={profileData.profile.handle || ''}
                      onChange={(e) =>
                        updateProfileField('handle', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
                      placeholder='@yourhandle'
                    />
                  ) : (
                    <p className='text-foreground'>
                      {profileData.profile.handle || 'Not set'}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      value={profileData.profile.location || ''}
                      onChange={(e) =>
                        updateProfileField('location', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
                      placeholder='Your location'
                    />
                  ) : (
                    <p className='text-foreground'>
                      {profileData.profile.location || 'Not set'}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-foreground mb-2'>
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type='url'
                      value={profileData.profile.own_website || ''}
                      onChange={(e) =>
                        updateProfileField('own_website', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
                      placeholder='https://yourwebsite.com'
                    />
                  ) : (
                    <p className='text-foreground'>
                      {profileData.profile.own_website ? (
                        <a
                          href={profileData.profile.own_website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-primary hover:underline'
                        >
                          {profileData.profile.own_website}
                        </a>
                      ) : (
                        'Not set'
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className='card p-6'>
              <h2 className='text-xl font-semibold text-highlight mb-4 flex items-center'>
                <Icon icon='ph:file-text-duotone' width={24} className='mr-2' />
                Bio
              </h2>
              {isEditing ? (
                <textarea
                  value={profileData.profile.bio || ''}
                  onChange={(e) => updateProfileField('bio', e.target.value)}
                  className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground min-h-[100px]'
                  placeholder='Tell us about yourself...'
                />
              ) : (
                <p className='text-foreground whitespace-pre-wrap'>
                  {profileData.profile.bio || 'No bio provided'}
                </p>
              )}
            </div>

            {/* Why Joined & Why Nuclear */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='card p-6'>
                <h2 className='text-xl font-semibold text-highlight mb-4 flex items-center'>
                  <Icon icon='ph:heart-duotone' width={24} className='mr-2' />
                  Why I Joined
                </h2>
                {isEditing ? (
                  <textarea
                    value={profileData.profile.why_joined || ''}
                    onChange={(e) =>
                      updateProfileField('why_joined', e.target.value)
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground min-h-[100px]'
                    placeholder='What brought you to Atomic Ambitions?'
                  />
                ) : (
                  <p className='text-foreground whitespace-pre-wrap'>
                    {profileData.profile.why_joined || 'Not provided'}
                  </p>
                )}
              </div>
              <div className='card p-6'>
                <h2 className='text-xl font-semibold text-highlight mb-4 flex items-center'>
                  <Icon icon='ph:atom-duotone' width={24} className='mr-2' />
                  Why Nuclear
                </h2>
                {isEditing ? (
                  <textarea
                    value={profileData.profile.why_nuclear || ''}
                    onChange={(e) =>
                      updateProfileField('why_nuclear', e.target.value)
                    }
                    className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground min-h-[100px]'
                    placeholder='What draws you to nuclear energy?'
                  />
                ) : (
                  <p className='text-foreground whitespace-pre-wrap'>
                    {profileData.profile.why_nuclear || 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            {/* Favorites */}
            <div className='card p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold text-highlight flex items-center'>
                  <Icon icon='ph:star-duotone' width={24} className='mr-2' />
                  Favorites
                </h2>
                {isEditing && (
                  <button
                    onClick={addFavorite}
                    className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
                  >
                    Add Favorite
                  </button>
                )}
              </div>
              {profileData.favorites.length === 0 ? (
                <p className='text-muted-foreground'>No favorites added yet</p>
              ) : (
                <div className='space-y-4'>
                  {profileData.favorites.map((favorite, index) => (
                    <div
                      key={index}
                      className='border border-border rounded-md p-4'
                    >
                      {isEditing ? (
                        <div className='space-y-3'>
                          <div className='flex justify-between items-start'>
                            <div className='flex-1 space-y-3'>
                              <input
                                type='text'
                                value={favorite.label || ''}
                                onChange={(e) =>
                                  updateFavorite(index, 'label', e.target.value)
                                }
                                className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
                                placeholder='Favorite name'
                              />
                              <input
                                type='url'
                                value={favorite.url || ''}
                                onChange={(e) =>
                                  updateFavorite(index, 'url', e.target.value)
                                }
                                className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
                                placeholder='https://example.com'
                              />
                              <textarea
                                value={favorite.explanation || ''}
                                onChange={(e) =>
                                  updateFavorite(
                                    index,
                                    'explanation',
                                    e.target.value
                                  )
                                }
                                className='w-full px-3 py-2 border border-border rounded-md bg-background text-foreground'
                                placeholder='Why is this a favorite?'
                                rows={2}
                              />
                            </div>
                            <button
                              onClick={() => removeFavorite(index)}
                              className='ml-3 p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors'
                            >
                              <Icon icon='ph:trash-duotone' width={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className='font-medium text-foreground'>
                            {favorite.label}
                          </h3>
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
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Social IDs */}
            <div className='card p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold text-highlight flex items-center'>
                  <Icon
                    icon='ph:share-network-duotone'
                    width={24}
                    className='mr-2'
                  />
                  Social Links
                </h2>
                {isEditing && (
                  <button
                    onClick={addSocialId}
                    className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
                  >
                    Add Social Link
                  </button>
                )}
              </div>
              {profileData.socialIds.length === 0 ? (
                <p className='text-muted-foreground'>
                  No social links added yet
                </p>
              ) : (
                <div className='space-y-4'>
                  {profileData.socialIds.map((socialId, index) => (
                    <div
                      key={index}
                      className='border border-border rounded-md p-4'
                    >
                      {isEditing ? (
                        <div className='flex items-center space-x-3'>
                          <select
                            value={socialId.platform_code}
                            onChange={(e) =>
                              updateSocialId(
                                index,
                                'platform_code',
                                e.target.value
                              )
                            }
                            className='px-3 py-2 border border-border rounded-md bg-background text-foreground'
                          >
                            <option value=''>Select platform</option>
                            {profileData.socialPlatforms.map((platform) => (
                              <option key={platform.code} value={platform.code}>
                                {platform.display_name}
                              </option>
                            ))}
                          </select>
                          <input
                            type='text'
                            value={socialId.social_id || ''}
                            onChange={(e) =>
                              updateSocialId(index, 'social_id', e.target.value)
                            }
                            className='flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground'
                            placeholder='Username or ID'
                          />
                          <button
                            onClick={() => removeSocialId(index)}
                            className='p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors'
                          >
                            <Icon icon='ph:trash-duotone' width={20} />
                          </button>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-3'>
                          <span className='font-medium text-foreground'>
                            {profileData.socialPlatforms.find(
                              (p) => p.code === socialId.platform_code
                            )?.display_name || socialId.platform_code}
                          </span>
                          <span className='text-muted-foreground'>:</span>
                          <span className='text-foreground'>
                            {socialId.social_id}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
