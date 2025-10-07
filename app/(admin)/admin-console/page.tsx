// Fake data for the admin dashboard
const userStats = {
  totalUsers: 1247,
  newThisWeek: 23,
  activeUsers: 892,
}

const weeklyActivity = [
  { week: 'Week 1', activeUsers: 756, newUsers: 18, messages: 42 },
  { week: 'Week 2', activeUsers: 823, newUsers: 31, messages: 58 },
  { week: 'Week 3', activeUsers: 892, newUsers: 23, messages: 67 },
]

const recentMessages = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    subject: 'Membership upgrade question',
    preview:
      'Hi, I was wondering about the benefits of upgrading to the Premium membership...',
    timestamp: '2 hours ago',
    status: 'unread',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    email: 'marcus.j@email.com',
    subject: 'Technical support needed',
    preview:
      "I'm having trouble accessing the member portal. Getting a 404 error...",
    timestamp: '4 hours ago',
    status: 'in-progress',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    subject: 'Event registration issue',
    preview:
      'I tried to register for the nuclear physics workshop but the form keeps...',
    timestamp: '6 hours ago',
    status: 'resolved',
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@email.com',
    subject: 'Payment confirmation',
    preview:
      "I just made a payment but haven't received a confirmation email yet...",
    timestamp: '1 day ago',
    status: 'unread',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    subject: 'Feature request',
    preview:
      'Would it be possible to add a mobile app? The website is great but...',
    timestamp: '2 days ago',
    status: 'reviewing',
  },
]

export default function AdminConsole() {
  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='card'>
          <h3 className='text-lg font-semibold mb-2'>Total Users</h3>
          <p className='text-3xl font-bold text-primary'>
            {userStats.totalUsers.toLocaleString()}
          </p>
          <p className='text-sm text-muted-foreground mt-1'>
            +{userStats.newThisWeek} this week
          </p>
        </div>

        <div className='card'>
          <h3 className='text-lg font-semibold mb-2'>Active Users</h3>
          <p className='text-3xl font-bold text-success'>
            {userStats.activeUsers.toLocaleString()}
          </p>
          <p className='text-sm text-muted-foreground mt-1'>
            {Math.round((userStats.activeUsers / userStats.totalUsers) * 100)}%
            of total
          </p>
        </div>

        <div className='card'>
          <h3 className='text-lg font-semibold mb-2'>Growth Rate</h3>
          <p className='text-3xl font-bold text-info'>+12.5%</p>
          <p className='text-sm text-muted-foreground mt-1'>vs last month</p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className='card mb-8'>
        <h3 className='text-xl font-semibold mb-6'>
          Weekly Activity (Past 3 Weeks)
        </h3>
        <div className='space-y-4'>
          {weeklyActivity.map((week, index) => (
            <div
              key={week.week}
              className='border border-border rounded-lg p-4'>
              <div className='flex justify-between items-center mb-3'>
                <h4 className='font-medium'>{week.week}</h4>
                <span className='text-sm text-muted-foreground'>
                  {new Date(
                    Date.now() - (2 - index) * 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-primary'>
                    {week.activeUsers}
                  </p>
                  <p className='text-sm text-muted-foreground'>Active Users</p>
                </div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-success'>
                    +{week.newUsers}
                  </p>
                  <p className='text-sm text-muted-foreground'>New Users</p>
                </div>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-info'>
                    {week.messages}
                  </p>
                  <p className='text-sm text-muted-foreground'>Messages</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className='card'>
        <h3 className='text-xl font-semibold mb-6'>Latest Customer Messages</h3>
        <div className='space-y-4'>
          {recentMessages.map((message) => (
            <div
              key={message.id}
              className='border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors'>
              <div className='flex justify-between items-start mb-2'>
                <div className='flex-1'>
                  <h4 className='font-medium text-foreground'>
                    {message.subject}
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    From: {message.name} ({message.email})
                  </p>
                </div>
                <div className='flex items-center space-x-2'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === 'unread'
                        ? 'bg-warning/20 text-warning'
                        : message.status === 'in-progress'
                        ? 'bg-info/20 text-info'
                        : message.status === 'resolved'
                        ? 'bg-success/20 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                    {message.status.replace('-', ' ')}
                  </span>
                  <span className='text-sm text-muted-foreground'>
                    {message.timestamp}
                  </span>
                </div>
              </div>
              <p className='text-sm text-muted-foreground line-clamp-2'>
                {message.preview}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-6 pt-4 border-t border-border'>
          <button className='btn btn-outline'>View All Messages</button>
        </div>
      </div>
    </main>
  )
}
