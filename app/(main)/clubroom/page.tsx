'use client'

import JoinCta from '../../components/join-cta'
import { Icon } from '@iconify/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data for demonstration - replace with real API calls
const mockRecentLessons = [
  {
    id: 'lesson-1',
    title: 'Advanced Reactor Safety Systems',
    completedAt: new Date('2024-12-15T10:30:00Z'),
    progress: 100,
    category: 'Safety Engineering',
  },
  {
    id: 'lesson-2',
    title: 'Nuclear Fuel Cycle Economics',
    completedAt: new Date('2024-12-14T16:45:00Z'),
    progress: 85,
    category: 'Economics',
  },
  {
    id: 'lesson-3',
    title: 'Small Modular Reactor Design',
    completedAt: new Date('2024-12-13T09:20:00Z'),
    progress: 100,
    category: 'Engineering',
  },
]

const mockFluxPosts = [
  {
    id: 'post-1',
    title: 'New developments in fusion reactor design',
    excerpt:
      'Just read about the latest breakthroughs in tokamak technology...',
    postedAt: new Date('2024-12-15T14:22:00Z'),
    likes: 12,
    replies: 8,
  },
  {
    id: 'post-2',
    title: 'Question about waste management strategies',
    excerpt: 'Looking for input on advanced reprocessing techniques...',
    postedAt: new Date('2024-12-14T11:15:00Z'),
    likes: 7,
    replies: 15,
  },
  {
    id: 'post-3',
    title: 'Nuclear energy and climate change',
    excerpt: "Sharing some thoughts on nuclear's role in decarbonization...",
    postedAt: new Date('2024-12-13T16:30:00Z'),
    likes: 24,
    replies: 12,
  },
]

const mockStats = {
  karmaScore: 127,
  lessonsCompleted: 23,
  postsMade: 45,
  repliesGiven: 128,
  memberSince: new Date('2024-08-28T16:45:00Z'),
}

function MemberDashboard() {
  const session = useSession()
  const user = session.data?.user
  const profile = user?.summary

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    )

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 168) {
      const days = Math.floor(diffInHours / 24)
      return `${days}d ago`
    } else {
      return formatDate(date)
    }
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        {/* Welcome Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-4 mb-4'>
            {profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                width={80}
                height={80}
                alt={user?.name || profile?.alias || 'Profile'}
                className='w-20 h-20 rounded-full object-cover border-4 border-primary'
              />
            ) : (
              <div className='w-20 h-20 rounded-full bg-gradient-to-br from-cherenkov to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold'>
                {user?.name
                  ? user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                  : profile?.alias?.[0] || 'U'}
              </div>
            )}
            <div>
              <h1 className='text-3xl font-bold text-foreground'>
                Hello, {profile?.alias || user?.name || 'Member'}!
              </h1>
              <p className='text-muted-foreground'>
                Member since{' '}
                {formatDate(new Date(profile?.membership?.joinedAt || ''))}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='card p-6 text-center'>
            <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cherenkov to-primary rounded-full mx-auto mb-4'>
              <Icon
                icon='ph:star-duotone'
                width={24}
                className='text-primary-foreground'
              />
            </div>
            <h3 className='text-2xl font-bold text-primary mb-2'>
              {mockStats.karmaScore}
            </h3>
            <p className='text-muted-foreground'>Karma Score</p>
          </div>

          <div className='card p-6 text-center'>
            <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-success to-success/80 rounded-full mx-auto mb-4'>
              <Icon
                icon='ph:graduation-cap-duotone'
                width={24}
                className='text-white'
              />
            </div>
            <h3 className='text-2xl font-bold text-success mb-2'>
              {mockStats.lessonsCompleted}
            </h3>
            <p className='text-muted-foreground'>Lessons Completed</p>
          </div>

          <div className='card p-6 text-center'>
            <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-warning to-warning/80 rounded-full mx-auto mb-4'>
              <Icon
                icon='ph:chat-circle-duotone'
                width={24}
                className='text-white'
              />
            </div>
            <h3 className='text-2xl font-bold text-warning mb-2'>
              {mockStats.postsMade}
            </h3>
            <p className='text-muted-foreground'>Flux Posts</p>
          </div>

          <div className='card p-6 text-center'>
            <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-info to-info/80 rounded-full mx-auto mb-4'>
              <Icon
                icon='ph:chat-text-duotone'
                width={24}
                className='text-white'
              />
            </div>
            <h3 className='text-2xl font-bold text-info mb-2'>
              {mockStats.repliesGiven}
            </h3>
            <p className='text-muted-foreground'>Replies Given</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Link
            href='/lessons'
            className='card p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 group'
          >
            <div className='flex items-center space-x-4'>
              <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg group-hover:scale-110 transition-transform duration-200'>
                <Icon
                  icon='ph:book-open-duotone'
                  width={24}
                  className='text-white'
                />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>
                  Continue Learning
                </h3>
                <p className='text-muted-foreground'>
                  Pick up where you left off
                </p>
              </div>
            </div>
          </Link>

          <Link
            href='/flux'
            className='card p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 group'
          >
            <div className='flex items-center space-x-4'>
              <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-logo-background to-logo-background/80 rounded-lg group-hover:scale-110 transition-transform duration-200'>
                <Icon
                  icon='ph:lightning-duotone'
                  width={24}
                  className='text-highlight'
                />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>
                  Join Flux
                </h3>
                <p className='text-muted-foreground'>
                  Connect with the community
                </p>
              </div>
            </div>
          </Link>

          <Link
            href='/adventures'
            className='card p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 group'
          >
            <div className='flex items-center space-x-4'>
              <div className='flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-lg group-hover:scale-110 transition-transform duration-200'>
                <Icon
                  icon='ph:rocket-duotone'
                  width={24}
                  className='text-white'
                />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>
                  New Adventures
                </h3>
                <p className='text-muted-foreground'>
                  Explore interactive content
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Recent Lessons */}
          <div className='card p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-foreground flex items-center'>
                <Icon
                  icon='ph:graduation-cap-duotone'
                  width={20}
                  className='mr-2 text-primary'
                />
                Recent Lessons
              </h2>
              <Link
                href='/lessons'
                className='text-primary hover:text-primary/80 text-sm font-medium'
              >
                View All
              </Link>
            </div>
            <div className='space-y-4'>
              {mockRecentLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className='flex items-center justify-between p-4 bg-muted/30 rounded-lg'
                >
                  <div className='flex-1'>
                    <h3 className='font-medium text-foreground'>
                      {lesson.title}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      {lesson.category}
                    </p>
                    <div className='flex items-center mt-2'>
                      <div className='w-full bg-muted rounded-full h-2 mr-3'>
                        <div
                          className='bg-primary h-2 rounded-full'
                          style={{ width: `${lesson.progress}%` }}
                        ></div>
                      </div>
                      <span className='text-xs text-muted-foreground'>
                        {lesson.progress}%
                      </span>
                    </div>
                  </div>
                  <span className='text-xs text-muted-foreground ml-4'>
                    {formatRelativeTime(lesson.completedAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Flux Posts */}
          <div className='card p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-foreground flex items-center'>
                <Icon
                  icon='ph:lightning-duotone'
                  width={20}
                  className='mr-2 text-secondary'
                />
                Recent Flux Posts
              </h2>
              <Link
                href='/flux'
                className='text-primary hover:text-primary/80 text-sm font-medium'
              >
                View All
              </Link>
            </div>
            <div className='space-y-4'>
              {mockFluxPosts.map((post) => (
                <div key={post.id} className='p-4 bg-muted/30 rounded-lg'>
                  <h3 className='font-medium text-foreground mb-2'>
                    {post.title}
                  </h3>
                  <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                    {post.excerpt}
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4 text-xs text-muted-foreground'>
                      <span className='flex items-center'>
                        <Icon
                          icon='ph:heart-duotone'
                          width={12}
                          className='mr-1'
                        />
                        {post.likes}
                      </span>
                      <span className='flex items-center'>
                        <Icon
                          icon='ph:chat-circle-duotone'
                          width={12}
                          className='mr-1'
                        />
                        {post.replies}
                      </span>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      {formatRelativeTime(post.postedAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NonMemberLanding() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Hero Section */}
          <div className='mb-12'>
            <div className='flex items-center justify-center mb-6'>
              <Image
                src='/atomic-ambitions-logo.png'
                alt='Atomic Ambitions Logo'
                width={120}
                height={120}
                className='rounded-lg'
              />
            </div>
            <h1 className='text-4xl md:text-6xl font-bold text-foreground mb-6'>
              Welcome to the <span className='text-highlight'>Clubroom</span>
            </h1>
            <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
              Your gateway to the Atomic Ambitions community. Connect with
              fellow nuclear professionals, access exclusive content, and be
              part of the clean energy revolution.
            </p>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
            <div className='card p-6 text-center'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4'>
                <Icon
                  icon='ph:graduation-cap-duotone'
                  width={32}
                  className='text-white'
                />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Expert Lessons
              </h3>
              <p className='text-muted-foreground'>
                Learn from industry leaders with our comprehensive course
                library
              </p>
            </div>

            <div className='card p-6 text-center'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-full mx-auto mb-4'>
                <Icon
                  icon='ph:lightning-duotone'
                  width={32}
                  className='text-white'
                />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Flux Community
              </h3>
              <p className='text-muted-foreground'>
                Engage in discussions with nuclear professionals worldwide
              </p>
            </div>

            <div className='card p-6 text-center'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full mx-auto mb-4'>
                <Icon
                  icon='ph:rocket-duotone'
                  width={32}
                  className='text-white'
                />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Interactive Adventures
              </h3>
              <p className='text-muted-foreground'>
                Experience nuclear science through immersive simulations
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className='space-y-6'>
            <JoinCta
              title='Ready to Join the Community?'
              encouragement='Get access to exclusive content, connect with experts, and be part of the nuclear renaissance. Membership is free and takes just minutes to set up.'
              buttonText='Create Your Account'
              className='max-w-2xl mx-auto'
            />

            <div className='flex items-center justify-center space-x-4 text-sm text-muted-foreground'>
              <span>Already have an account?</span>
              <button className='text-primary hover:text-primary/80 font-medium'>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClubroomPage() {
  const session = useSession()
  const isSignedIn = session.status === 'authenticated'

  // Set page title for bookmarking
  if (typeof document !== 'undefined') {
    document.title = isSignedIn
      ? 'Clubroom - Atomic Ambitions'
      : 'Join Atomic Ambitions - Clubroom'
  }

  return isSignedIn ? <MemberDashboard /> : <NonMemberLanding />
}
