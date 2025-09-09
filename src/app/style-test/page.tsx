"use client";

import { ThemeToggle } from "../components/theme-toggle";

export default function ColorTestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header with theme toggle */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Style Test Page
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Typography Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Typography
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                Heading 1 - Primary
              </h1>
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                Heading 2 - Accent
              </h2>
              <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                Heading 3 - Warning
              </h3>
              <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                Heading 4 - Secondary
              </h4>
              <p className="text-base text-gray-700 dark:text-gray-300">
                This is a paragraph with regular text. It should be readable in
                both light and dark modes. The text color adapts based on the
                current theme.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is smaller text that should also be clearly visible.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This is text inside a light blue background container.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This is text inside a light yellow background container.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This is text inside a light purple background container.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Buttons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Primary Button
            </button>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
              Secondary Button
            </button>
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
              Outline Button
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
              Gradient Button
            </button>
            <button className="px-6 py-3 bg-yellow-100 dark:bg-yellow-900/30 text-gray-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors font-medium">
              Light Button
            </button>
            <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
              Accent Button
            </button>
            <button className="px-6 py-3 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors font-medium">
              Dark Button
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
              Reverse Gradient
            </button>
          </div>
        </section>

        {/* Links Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Links
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors">
                Primary Link
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline transition-colors">
                Secondary Link
              </a>
              <a
                href="#"
                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 underline transition-colors">
                Warning Link
              </a>
              <a
                href="#"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline transition-colors">
                Accent Link
              </a>
            </div>
            <div className="space-y-2">
              <p>
                This paragraph contains an{" "}
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors">
                  inline link
                </a>{" "}
                that should be clearly visible and interactive.
              </p>
              <p>
                Here&apos;s another{" "}
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline transition-colors">
                  inline link
                </a>{" "}
                with different styling.
              </p>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                Primary Card
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A clean, modern card design with proper contrast and readability
                in both light and dark modes.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Accent Card
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A card with a subtle blue background that provides visual
                hierarchy and interest.
              </p>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Explore
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Gradient Card</h3>
              <p className="mb-4 opacity-90">
                A striking gradient card that showcases modern design trends and
                visual appeal.
              </p>
              <button className="w-full px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                Discover
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-yellow-50 dark:bg-gray-700 rounded-lg shadow-lg p-6 border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Warning Card
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A card with yellow accent colors that can be used for warnings
                or important information.
              </p>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Study
              </button>
            </div>

            {/* Card 5 */}
            <div className="bg-purple-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Secondary Card
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A card with purple accent colors that provides variety in the
                design system.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Investigate
              </button>
            </div>

            {/* Card 6 */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Reverse Gradient</h3>
              <p className="mb-4 opacity-90">
                Another gradient card with reversed colors to show design
                flexibility and consistency.
              </p>
              <button className="w-full px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Form Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text Input
                </label>
                <input
                  type="text"
                  placeholder="Enter some text..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Input
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Dropdown
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors">
                  <option>Choose an option</option>
                  <option>Primary Option</option>
                  <option>Secondary Option</option>
                  <option>Accent Option</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Textarea
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your message..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors resize-vertical"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-600 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the terms
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="option"
                    className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-600 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Option 1
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="option"
                    className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-600 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Option 2
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Status Indicators Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Status Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Success
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
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-full h-16 bg-blue-600 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Primary Blue
              </p>
              <p className="text-xs text-gray-500">#2563eb</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-gray-600 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Secondary Gray
              </p>
              <p className="text-xs text-gray-500">#4b5563</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-yellow-500 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Warning Yellow
              </p>
              <p className="text-xs text-gray-500">#eab308</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-purple-600 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Accent Purple
              </p>
              <p className="text-xs text-gray-500">#9333ea</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-orange-600 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Accent Orange
              </p>
              <p className="text-xs text-gray-500">#ea580c</p>
            </div>
            <div className="text-center">
              <div className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-2"></div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Blue-Purple Gradient
              </p>
              <p className="text-xs text-gray-500">Blue → Purple</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
