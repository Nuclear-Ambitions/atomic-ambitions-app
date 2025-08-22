import Image from "next/image";
import { ThemeToggle } from "./components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />
      {/* Header */}
      <header className="py-8 bg-gradient-nuclear text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider">
            <span className="uranium drop-shadow-lg">Atomic Ambitions</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Section 1 */}
        <section className="min-h-screen bg-cherenkov-light flex items-center">
          <div className="container mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold graphite dark:text-light-gray mb-6">
                  Welcome to the Future
                </h2>
                <p className="text-lg graphite dark:text-light-gray leading-relaxed">
                  Discover the power of atomic innovation and sustainable energy
                  solutions. We're pioneering the next generation of nuclear
                  technology to create a cleaner, more efficient world for
                  future generations.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-steel p-8 rounded-lg shadow-lg border border-cherenkov/20 dark:border-cherenkov/30">
                <h3 className="text-xl font-semibold cherenkov mb-4">
                  Join Our Mission
                </h3>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-cherenkov/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cherenkov focus:border-cherenkov dark:bg-dark-charcoal dark:border-dark-steel dark:text-light-gray dark:placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-cherenkov text-white py-2 px-4 rounded-md hover:bg-cherenkov/90 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="min-h-screen bg-uranium-light flex items-center">
          <div className="container mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white dark:bg-dark-steel p-8 rounded-lg shadow-lg border border-uranium/20 dark:border-uranium/30">
                <h3 className="text-xl font-semibold graphite dark:text-light-gray mb-4">
                  Our Technology
                </h3>
                <div className="w-full h-48 bg-gradient-nuclear rounded-md flex items-center justify-center">
                  <span className="text-white font-semibold">
                    Technology Preview
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold graphite dark:text-light-gray mb-6">
                  Revolutionary Technology
                </h2>
                <p className="text-lg graphite dark:text-light-gray leading-relaxed">
                  Our cutting-edge nuclear fusion technology represents a
                  breakthrough in sustainable energy production. With zero
                  carbon emissions and virtually unlimited fuel supply, we're
                  redefining what's possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="min-h-screen bg-cooling-tower-light flex items-center">
          <div className="container mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold graphite dark:text-light-gray mb-6">
                  Safety First
                </h2>
                <p className="text-lg graphite dark:text-light-gray leading-relaxed">
                  Safety is our highest priority. Our advanced containment
                  systems and fail-safe mechanisms ensure that our technology
                  operates with the highest standards of security and
                  reliability.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-steel p-8 rounded-lg shadow-lg border border-cooling-tower/20 dark:border-cooling-tower/30">
                <h3 className="text-xl font-semibold cooling-tower mb-4">
                  Safety Report
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cherenkov rounded-full"></div>
                    <span className="graphite dark:text-light-gray">
                      99.9% Safety Rating
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cherenkov rounded-full"></div>
                    <span className="graphite dark:text-light-gray">
                      Zero Incidents
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cherenkov rounded-full"></div>
                    <span className="graphite dark:text-light-gray">
                      ISO Certified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="min-h-screen bg-graphite-light flex items-center">
          <div className="container mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white dark:bg-dark-steel p-8 rounded-lg shadow-lg border border-graphite/20 dark:border-graphite/30">
                <h3 className="text-xl font-semibold graphite dark:text-light-gray mb-4">
                  Contact Us
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-graphite/30 rounded-md focus:outline-none focus:ring-2 focus:ring-graphite focus:border-graphite dark:bg-dark-charcoal dark:border-dark-steel dark:text-light-gray dark:placeholder-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-graphite/30 rounded-md focus:outline-none focus:ring-2 focus:ring-graphite focus:border-graphite dark:bg-dark-charcoal dark:border-dark-steel dark:text-light-gray dark:placeholder-gray-400"
                  />
                  <textarea
                    placeholder="Your message"
                    rows={4}
                    className="w-full px-4 py-2 border border-graphite/30 rounded-md focus:outline-none focus:ring-2 focus:ring-graphite focus:border-graphite dark:bg-dark-charcoal dark:border-dark-steel dark:text-light-gray dark:placeholder-gray-400"></textarea>
                  <button
                    type="submit"
                    className="w-full bg-graphite text-white py-2 px-4 rounded-md hover:bg-graphite/90 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
              <div>
                <h2 className="text-4xl font-bold graphite dark:text-light-gray mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg graphite dark:text-light-gray leading-relaxed">
                  Ready to be part of the energy revolution? We'd love to hear
                  from you. Whether you're interested in partnerships,
                  investments, or just want to learn more, our team is here to
                  help.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-graphite text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg uranium">©2025 Nuclear Ambitions LLC</p>
        </div>
      </footer>
    </div>
  );
}
