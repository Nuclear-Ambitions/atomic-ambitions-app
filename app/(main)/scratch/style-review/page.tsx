'use client'

import { ThemeToggle } from '@/components/theme-toggle'

export default function StyleReview() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <header className='mb-12'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>
            Style Review & Theme Showcase
          </h1>
          <p className='text-lg text-muted-foreground'>
            A comprehensive display of typography, colors, components, and
            design elements
          </p>
          <ThemeToggle />
        </header>

        {/* Typography Section */}
        <section className='mb-16'>
          <h2 className='text-secondary'>Typography</h2>

          <div className='grid gap-8 md:grid-cols-2'>
            <div className='space-y-6'>
              <div>
                <h3 className='text-highlight'>Headings</h3>
                <div className='space-y-4'>
                  <h1>Heading 1</h1>
                  <h2>Heading 2</h2>
                  <h3>Heading 3</h3>
                  <h4>Heading 4</h4>
                  <h5>Heading 5</h5>
                  <h6>Heading 6</h6>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <div>
                <h3 className='text-highlight'>Body Text</h3>
                <div className='space-y-4'>
                  <p className='text-lg text-foreground'>
                    Large body text - Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </p>
                  <p className='text-base text-foreground'>
                    Regular body text - Sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Small text - Ut enim ad minim veniam, quis nostrud
                    exercitation.
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Extra small text - Duis aute irure dolor in reprehenderit.
                  </p>
                </div>
              </div>

              <div>
                <h3 className='text-highlight'>Code & Monospace</h3>
                <div className='space-y-2'>
                  <code className='text-sm bg-muted px-2 py-1 rounded text-foreground'>
                    inline code
                  </code>
                  <pre className='text-sm card p-4 my-1 overflow-x-auto'>
                    {`function example() {
  return "Hello World";
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-foreground mb-8'>
            Color Palette
          </h2>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-foreground'>
                Brand Colors
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-primary rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Primary</div>
                    <div className='text-sm text-muted-foreground'>#3b82f6</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-secondary rounded-lg border border-border'></div>
                  <div>
                    <div className='font-medium text-foreground'>Secondary</div>
                    <div className='text-sm text-muted-foreground'>#f1f5f9</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-accent rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Accent</div>
                    <div className='text-sm text-muted-foreground'>
                      #e46918 - rusty
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-highlight rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Highlight</div>
                    <div className='text-sm text-muted-foreground'>
                      #20c8fb - cherenkov
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-foreground'>
                Status Colors
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-success rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Success</div>
                    <div className='text-sm text-muted-foreground'>#10b981</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-warning rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Warning</div>
                    <div className='text-sm text-muted-foreground'>#f59e0b</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-error rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Error</div>
                    <div className='text-sm text-muted-foreground'>#ef4444</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-info rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Info</div>
                    <div className='text-sm text-muted-foreground'>#06b6d4</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-foreground'>
                Neutral Colors
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-background border border-border rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>
                      Background
                    </div>
                    <div className='text-sm text-muted-foreground'>#ffffff</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-muted rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Muted</div>
                    <div className='text-sm text-muted-foreground'>#f8fafc</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-card border border-border rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Card</div>
                    <div className='text-sm text-muted-foreground'>#ffffff</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-foreground'>
                Text Colors
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-foreground rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>
                      Foreground
                    </div>
                    <div className='text-sm text-muted-foreground'>#0f172a</div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-muted-foreground rounded-lg'></div>
                  <div>
                    <div className='font-medium text-foreground'>Muted</div>
                    <div className='text-sm text-muted-foreground'>#64748b</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-foreground mb-8'>
            Buttons
          </h2>

          <div className='space-y-8'>
            <div>
              <h3 className='text-xl font-medium text-foreground mb-4'>
                Primary Buttons
              </h3>
              <div className='flex flex-wrap gap-4'>
                <button className='px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity'>
                  Primary
                </button>
                <button className='px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity'>
                  Large Primary
                </button>
                <button className='px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity'>
                  Small Primary
                </button>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-medium text-foreground mb-4'>
                Secondary Buttons
              </h3>
              <div className='flex flex-wrap gap-4'>
                <button className='btn px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium transition-opacity'>
                  Secondary
                </button>
                <button className='px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-80 transition-opacity'>
                  Accent
                </button>
                <button className='btn btn-outline'>Outline</button>
                <button className='btn btn-outline-highlight'>Highlight</button>
                <button className='btn btn-ghost'>Ghost</button>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-medium text-foreground mb-4'>
                Status Buttons
              </h3>
              <div className='flex flex-wrap gap-4'>
                <button className='px-4 py-2 bg-success text-success-foreground rounded-lg font-medium transition-opacity'>
                  Success
                </button>
                <button className='px-4 py-2 bg-warning text-warning-foreground rounded-lg font-medium hover:opacity-90 transition-opacity'>
                  Warning
                </button>
                <button className='px-4 py-2 bg-error text-error-foreground rounded-lg font-medium hover:opacity-90 transition-opacity'>
                  Error
                </button>
                <button className='px-4 py-2 bg-info text-info-foreground rounded-lg font-medium hover:opacity-90 transition-opacity'>
                  Info
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-foreground mb-8'>
            Cards & Panels
          </h2>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <div className='card border border-border rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-2'>Basic Card</h3>
              <p className='text-muted-foreground mb-4'>
                This is a basic card component with default styling.
              </p>
              <button className='px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity'>
                Action
              </button>
            </div>

            <div className='bg-muted border border-border rounded-lg p-6'>
              <h3 className='text-xl font-semibold text-foreground mb-2'>
                Muted Card
              </h3>
              <p className='text-muted-foreground mb-4'>
                This card uses the muted background color for subtle emphasis.
              </p>
              <button className='px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity'>
                Action
              </button>
            </div>

            <div className='bg-primary text-primary-foreground rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-2'>Primary Card</h3>
              <p className='opacity-90 mb-4'>
                This card uses the primary color scheme for high emphasis.
              </p>
              <button className='px-4 py-2 bg-white text-primary rounded-lg text-sm font-medium hover:opacity-90 transition-opacity'>
                Action
              </button>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-foreground mb-8'>
            Form Elements
          </h2>

          <div className='max-w-2xl space-y-6'>
            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Text Input
              </label>
              <input
                type='text'
                placeholder='Enter text here...'
                className='w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Textarea
              </label>
              <textarea
                placeholder='Enter your message...'
                rows={4}
                className='w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-foreground mb-2'>
                Select
              </label>
              <select className='w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div className='space-y-3'>
              <label className='flex items-center gap-3'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring'
                />
                <span className='text-sm font-medium text-foreground'>
                  Checkbox option
                </span>
              </label>
              <label className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='radio-group'
                  className='w-4 h-4 text-primary bg-input border-border focus:ring-ring'
                />
                <span className='text-sm font-medium text-foreground'>
                  Radio option 1
                </span>
              </label>
              <label className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='radio-group'
                  className='w-4 h-4 text-primary bg-input border-border focus:ring-ring'
                />
                <span className='text-sm font-medium text-foreground'>
                  Radio option 2
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-foreground mb-8'>
            Alerts & Notifications
          </h2>

          <div className='space-y-4'>
            <div className='p-4 bg-success/10 border border-success/20 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 bg-success rounded-full'></div>
                <p className='text-success font-medium'>Success message</p>
              </div>
              <p className='text-success/80 text-sm mt-1 ml-5'>
                Your action was completed successfully.
              </p>
            </div>

            <div className='p-4 bg-warning/10 border border-warning/20 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 bg-warning rounded-full'></div>
                <p className='text-warning font-medium'>Warning message</p>
              </div>
              <p className='text-warning/80 text-sm mt-1 ml-5'>
                Please review your input before proceeding.
              </p>
            </div>

            <div className='p-4 bg-error/10 border border-error/20 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 bg-error rounded-full'></div>
                <p className='text-error font-medium'>Error message</p>
              </div>
              <p className='text-error/80 text-sm mt-1 ml-5'>
                Something went wrong. Please try again.
              </p>
            </div>

            <div className='p-4 bg-info/10 border border-info/20 rounded-lg'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 bg-info rounded-full'></div>
                <p className='text-info font-medium'>Info message</p>
              </div>
              <p className='text-info/80 text-sm mt-1 ml-5'>
                Here is some helpful information for you.
              </p>
            </div>
          </div>
        </section>

        {/* Spacing & Layout Section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-foreground mb-8'>
            Spacing & Layout
          </h2>

          <div className='space-y-6'>
            <div>
              <h3 className='text-xl font-medium text-foreground mb-4'>
                Spacing Scale
              </h3>
              <div className='space-y-2'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 text-sm text-muted-foreground'>
                    xs (4px)
                  </div>
                  <div className='w-1 h-4 bg-primary'></div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-16 text-sm text-muted-foreground'>
                    sm (8px)
                  </div>
                  <div className='w-2 h-4 bg-primary'></div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-16 text-sm text-muted-foreground'>
                    md (16px)
                  </div>
                  <div className='w-4 h-4 bg-primary'></div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-16 text-sm text-muted-foreground'>
                    lg (24px)
                  </div>
                  <div className='w-6 h-4 bg-primary'></div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-16 text-sm text-muted-foreground'>
                    xl (32px)
                  </div>
                  <div className='w-8 h-4 bg-primary'></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-medium text-foreground mb-4'>
                Border Radius
              </h3>
              <div className='flex items-center gap-6'>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-12 h-12 bg-primary rounded-none'></div>
                  <span className='text-sm text-muted-foreground'>None</span>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-12 h-12 bg-primary rounded-sm'></div>
                  <span className='text-sm text-muted-foreground'>Small</span>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-12 h-12 bg-primary rounded'></div>
                  <span className='text-sm text-muted-foreground'>Default</span>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-12 h-12 bg-primary rounded-lg'></div>
                  <span className='text-sm text-muted-foreground'>Large</span>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-12 h-12 bg-primary rounded-full'></div>
                  <span className='text-sm text-muted-foreground'>Full</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dark Mode Toggle Info */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold text-foreground mb-8'>
            Theme Information
          </h2>

          <div className='bg-card border border-border rounded-lg p-6'>
            <h3 className='text-xl font-semibold text-card-foreground mb-4'>
              Automatic Dark Mode
            </h3>
            <p className='text-muted-foreground mb-4'>
              This theme automatically adapts to your system&apos;s color scheme
              preference. Try switching between light and dark mode in your
              system settings to see the theme change.
            </p>
            <div className='grid gap-4 md:grid-cols-2'>
              <div>
                <h4 className='font-medium text-card-foreground mb-2'>
                  Light Mode
                </h4>
                <ul className='text-sm text-muted-foreground space-y-1'>
                  <li>• Clean white backgrounds</li>
                  <li>• Dark text for readability</li>
                  <li>• Subtle gray borders</li>
                </ul>
              </div>
              <div>
                <h4 className='font-medium text-card-foreground mb-2'>
                  Dark Mode
                </h4>
                <ul className='text-sm text-muted-foreground space-y-1'>
                  <li>• Dark slate backgrounds</li>
                  <li>• Light text for contrast</li>
                  <li>• Adjusted color intensities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
