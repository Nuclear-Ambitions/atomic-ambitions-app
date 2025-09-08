"use client";

import { ThemeToggle } from "../components/theme-toggle";

export default function ColorTestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header with theme toggle */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-dark-graphite/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cherenkov">Color Test Page</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Typography Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold cherenkov">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold graphite">
                Heading 1 - Graphite
              </h1>
              <h2 className="text-3xl font-bold cherenkov">
                Heading 2 - Cherenkov
              </h2>
              <h3 className="text-2xl font-bold uranium">
                Heading 3 - Uranium
              </h3>
              <h4 className="text-xl font-bold cooling-tower">
                Heading 4 - Cooling Tower
              </h4>
              <p className="text-base graphite">
                This is a paragraph with regular text. It should be readable in
                both light and dark modes. The text color adapts based on the
                current theme.
              </p>
              <p className="text-sm light-gray">
                This is smaller text that should also be clearly visible.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-cherenkov-light dark:bg-dark-blue rounded-lg">
                <p className="text-sm graphite dark:text-light-gray">
                  This is text inside a Cherenkov light background container.
                </p>
              </div>
              <div className="p-4 bg-uranium-light dark:bg-dark-steel rounded-lg">
                <p className="text-sm graphite dark:text-light-gray">
                  This is text inside a Uranium light background container.
                </p>
              </div>
              <div className="p-4 bg-cooling-tower-light dark:bg-dark-charcoal rounded-lg">
                <p className="text-sm graphite dark:text-light-gray">
                  This is text inside a Cooling Tower light background
                  container.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold cherenkov">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="px-6 py-3 bg-cherenkov text-white rounded-lg hover:bg-cherenkov/90 transition-colors font-medium">
              Primary Button
            </button>
            <button className="px-6 py-3 bg-graphite text-white rounded-lg hover:bg-graphite/90 transition-colors font-medium">
              Secondary Button
            </button>
            <button className="px-6 py-3 border-2 border-cherenkov text-cherenkov rounded-lg hover:bg-cherenkov hover:text-white transition-colors font-medium">
              Outline Button
            </button>
            <button className="px-6 py-3 bg-gradient-nuclear text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
              Gradient Button
            </button>
            <button className="px-6 py-3 bg-uranium text-graphite rounded-lg hover:bg-uranium/90 transition-colors font-medium">
              Light Button
            </button>
            <button className="px-6 py-3 bg-cooling-tower text-white rounded-lg hover:bg-cooling-tower/90 transition-colors font-medium">
              Accent Button
            </button>
            <button className="px-6 py-3 bg-dark-steel text-light-gray rounded-lg hover:bg-dark-steel/90 transition-colors font-medium">
              Dark Button
            </button>
            <button className="px-6 py-3 bg-gradient-nuclear-reverse text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
              Reverse Gradient
            </button>
          </div>
        </section>

        {/* Links Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold cherenkov">Links</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <a
                href="#"
                className="text-cherenkov hover:text-cherenkov/80 underline transition-colors">
                Cherenkov Link
              </a>
              <a
                href="#"
                className="text-graphite hover:text-graphite/80 underline transition-colors">
                Graphite Link
              </a>
              <a
                href="#"
                className="text-uranium hover:text-uranium/80 underline transition-colors">
                Uranium Link
              </a>
              <a
                href="#"
                className="text-cooling-tower hover:text-cooling-tower/80 underline transition-colors">
                Cooling Tower Link
              </a>
            </div>
            <div className="space-y-2">
              <p>
                This paragraph contains an{" "}
                <a
                  href="#"
                  className="text-cherenkov hover:text-cherenkov/80 underline transition-colors">
                  inline link
                </a>{" "}
                that should be clearly visible and interactive.
              </p>
              <p>
                Here's another{" "}
                <a
                  href="#"
                  className="text-graphite hover:text-graphite/80 underline transition-colors">
                  inline link
                </a>{" "}
                with different styling.
              </p>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold cherenkov">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-dark-steel rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold cherenkov mb-3">
                Nuclear Reactor
              </h3>
              <p className="text-graphite dark:text-light-gray mb-4">
                A controlled nuclear chain reaction that produces energy through
                fission.
              </p>
              <button className="w-full px-4 py-2 bg-cherenkov text-white rounded-lg hover:bg-cherenkov/90 transition-colors">
                Learn More
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-cherenkov-light dark:bg-dark-blue rounded-lg shadow-lg p-6 border border-cherenkov/20">
              <h3 className="text-xl font-bold graphite dark:text-light-gray mb-3">
                Cherenkov Radiation
              </h3>
              <p className="text-graphite dark:text-light-gray mb-4">
                The characteristic blue glow emitted when charged particles move
                faster than light in a medium.
              </p>
              <button className="w-full px-4 py-2 bg-graphite text-white rounded-lg hover:bg-graphite/90 transition-colors">
                Explore
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-nuclear rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Atomic Energy</h3>
              <p className="mb-4 opacity-90">
                Harnessing the power of the atom for clean, efficient energy
                production.
              </p>
              <button className="w-full px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                Discover
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-uranium-light dark:bg-dark-steel rounded-lg shadow-lg p-6 border border-uranium/20">
              <h3 className="text-xl font-bold graphite dark:text-light-gray mb-3">
                Uranium Processing
              </h3>
              <p className="text-graphite dark:text-light-gray mb-4">
                The complex process of enriching uranium for nuclear fuel
                applications.
              </p>
              <button className="w-full px-4 py-2 bg-cooling-tower text-white rounded-lg hover:bg-cooling-tower/90 transition-colors">
                Study
              </button>
            </div>

            {/* Card 5 */}
            <div className="bg-cooling-tower-light dark:bg-dark-charcoal rounded-lg shadow-lg p-6 border border-cooling-tower/20">
              <h3 className="text-xl font-bold graphite dark:text-light-gray mb-3">
                Cooling Systems
              </h3>
              <p className="text-graphite dark:text-light-gray mb-4">
                Essential systems for maintaining safe operating temperatures in
                nuclear facilities.
              </p>
              <button className="w-full px-4 py-2 bg-cherenkov text-white rounded-lg hover:bg-cherenkov/90 transition-colors">
                Investigate
              </button>
            </div>

            {/* Card 6 */}
            <div className="bg-gradient-nuclear-reverse rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Nuclear Safety</h3>
              <p className="mb-4 opacity-90">
                Comprehensive safety protocols and systems protecting people and
                the environment.
              </p>
              <button className="w-full px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                Learn Safety
              </button>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold cherenkov">Form Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium graphite dark:text-light-gray mb-2">
                  Text Input
                </label>
                <input
                  type="text"
                  placeholder="Enter some text..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-charcoal text-graphite dark:text-light-gray focus:border-cherenkov focus:ring-2 focus:ring-cherenkov/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium graphite dark:text-light-gray mb-2">
                  Email Input
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-charcoal text-graphite dark:text-light-gray focus:border-cherenkov focus:ring-2 focus:ring-cherenkov/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium graphite dark:text-light-gray mb-2">
                  Select Dropdown
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-charcoal text-graphite dark:text-light-gray focus:border-cherenkov focus:ring-2 focus:ring-cherenkov/20 transition-colors">
                  <option>Choose an option</option>
                  <option>Nuclear Reactor</option>
                  <option>Fusion Reactor</option>
                  <option>Research Facility</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium graphite dark:text-light-gray mb-2">
                  Textarea
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your message..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-charcoal text-graphite dark:text-light-gray focus:border-cherenkov focus:ring-2 focus:ring-cherenkov/20 transition-colors resize-vertical"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-cherenkov bg-white dark:bg-dark-charcoal border-gray-300 dark:border-gray-600 rounded focus:ring-cherenkov focus:ring-2"
                  />
                  <span className="text-sm graphite dark:text-light-gray">
                    I agree to the terms
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="option"
                    className="w-4 h-4 text-cherenkov bg-white dark:bg-dark-charcoal border-gray-300 dark:border-gray-600 focus:ring-cherenkov focus:ring-2"
                  />
                  <span className="text-sm graphite dark:text-light-gray">
                    Option 1
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="option"
                    className="w-4 h-4 text-cherenkov bg-white dark:bg-dark-charcoal border-gray-300 dark:border-gray-600 focus:ring-cherenkov focus:ring-2"
                  />
                  <span className="text-sm graphite dark:text-light-gray">
                    Option 2
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Status Indicators Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold cherenkov">Status Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Online
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Warning
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-red-800 dark:text-red-200">
                Error
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Info
              </span>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold cherenkov">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-full h-16 bg-cherenkov rounded-lg mb-2"></div>
              <p className="text-xs font-medium graphite dark:text-light-gray">
                Cherenkov
              </p>
              <p className="text-xs text-gray-500">#20c8fb</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-graphite rounded-lg mb-2"></div>
              <p className="text-xs font-medium graphite dark:text-light-gray">
                Graphite
              </p>
              <p className="text-xs text-gray-500">#454749</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-uranium rounded-lg mb-2"></div>
              <p className="text-xs font-medium graphite dark:text-light-gray">
                Uranium
              </p>
              <p className="text-xs text-gray-500">#fefadc</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-cooling-tower rounded-lg mb-2"></div>
              <p className="text-xs font-medium graphite dark:text-light-gray">
                Cooling Tower
              </p>
              <p className="text-xs text-gray-500">#8c92ac</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-dark-steel rounded-lg mb-2"></div>
              <p className="text-xs font-medium graphite dark:text-light-gray">
                Dark Steel
              </p>
              <p className="text-xs text-gray-500">#2d3748</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-gradient-nuclear rounded-lg mb-2"></div>
              <p className="text-xs font-medium graphite dark:text-light-gray">
                Nuclear Gradient
              </p>
              <p className="text-xs text-gray-500">Cherenkov → Cooling Tower</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
