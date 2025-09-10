import React from "react";

const WhyJoinPage = () => {
  return (
    <div className="min-h-screen bg-uranium-light dark:bg-dark-graphite">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-nuclear">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Unlock the Power of the Atom
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90">
            Be part of a community that empowers people to learn the truth and
            thrive.
          </p>
          <a
            href="#join-form"
            className="bg-cherenkov text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg">
            Join Now
          </a>
        </div>
      </section>

      {/* Reasons to Join Section */}
      <section className="py-16 bg-white dark:bg-dark-steel">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-graphite dark:text-light-gray">
            Why Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-graphite-light dark:bg-dark-charcoal rounded-lg shadow-lg border border-cherenkov/20">
              <h3 className="text-xl font-semibold mb-2 text-cherenkov">
                Educational
              </h3>
              <p className="text-graphite dark:text-light-gray">
                Enjoy resources to help you learn and share about the productive
                uses of atomic energy.
              </p>
            </div>
            <div className="text-center p-6 bg-graphite-light dark:bg-dark-charcoal rounded-lg shadow-lg border border-cherenkov/20">
              <h3 className="text-xl font-semibold mb-2 text-cherenkov">
                Engaging
              </h3>
              <p className="text-graphite dark:text-light-gray">
                Gain insights from industry experts. Connect with open-minded
                individuals. Expand your network.
              </p>
            </div>
            <div className="text-center p-6 bg-graphite-light dark:bg-dark-charcoal rounded-lg shadow-lg border border-cherenkov/20">
              <h3 className="text-xl font-semibold mb-2 text-cherenkov">
                Supportive
              </h3>
              <p className="text-graphite dark:text-light-gray">
                Explore the best of atomic energy in a welcoming environment.
              </p>
            </div>
          </div>
          <h3 className="mt-8 text-2xl font-bold text-center mb-8 text-graphite dark:text-uranium">
            Atomic energy has a bright future, and so do you.
          </h3>
        </div>
      </section>

      {/* Join Form Section */}
      <section
        id="join-form"
        className="py-16 bg-cooling-tower-light dark:bg-dark-blue">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-graphite dark:text-light-gray">
            Ready to Join?
          </h2>
          <form className="max-w-md mx-auto bg-white dark:bg-dark-steel p-8 rounded-lg shadow-lg border border-cherenkov/20">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-graphite dark:text-light-gray font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-cooling-tower dark:border-dark-steel rounded-lg bg-white dark:bg-dark-charcoal text-graphite dark:text-light-gray focus:border-cherenkov focus:ring-2 focus:ring-cherenkov/20 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cherenkov text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg">
              Join Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default WhyJoinPage;
