import React from "react";
import Link from "next/link";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cherenkov/10 via-uranium-alt/5 to-rusty/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-card-foreground">
            Discover the Power of Atomic Ambitions
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Four powerful platforms working together to advance nuclear energy,
            educate the next generation, and build the future of clean power.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/why-join/join"
              className="bg-cherenkov text-white font-semibold py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg">
              Join the Community
            </Link>
            <a
              href="#features"
              className="border-2 border-cherenkov text-cherenkov font-semibold py-4 px-8 rounded-lg hover:bg-cherenkov hover:text-white transition-all duration-200 text-lg">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">
              Four Platforms, One Mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Each platform serves a unique purpose in advancing nuclear energy
              and building a community of passionate advocates and
              professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Atomic Flux */}
            <div className="bg-gradient-to-br from-cherenkov/10 to-uranium-alt/10 p-8 rounded-xl border-l-4 border-cherenkov hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-cherenkov/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">💬</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Atomic Flux
                  </h3>
                  <p className="text-cherenkov font-semibold">Social Forum</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Connect with engineers, scientists, and enthusiasts in our
                vibrant social forum. Share ideas, ask questions, and
                collaborate on the future of nuclear energy.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-center space-x-2">
                  <span className="text-cherenkov">•</span>
                  <span>Real-time discussions on nuclear technology</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-cherenkov">•</span>
                  <span>Expert Q&A sessions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-cherenkov">•</span>
                  <span>Industry news and updates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-cherenkov">•</span>
                  <span>Collaborative project discussions</span>
                </li>
              </ul>
              <Link
                href="/flux"
                className="inline-flex items-center text-cherenkov font-semibold hover:underline">
                Explore Atomic Flux →
              </Link>
            </div>

            {/* Atomic Learning */}
            <div className="bg-gradient-to-br from-uranium-alt/10 to-rusty/10 p-8 rounded-xl border-l-4 border-uranium-alt hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-uranium-alt/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">📚</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Atomic Learning
                  </h3>
                  <p className="text-uranium-alt font-semibold">
                    Educational Platform
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Master nuclear energy concepts through bite-sized lessons
                designed for all skill levels. From basic physics to advanced
                reactor design.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-center space-x-2">
                  <span className="text-uranium-alt">•</span>
                  <span>Interactive lessons and quizzes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-uranium-alt">•</span>
                  <span>Progress tracking and certifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-uranium-alt">•</span>
                  <span>Expert-created content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-uranium-alt">•</span>
                  <span>Visual simulations and demos</span>
                </li>
              </ul>
              <Link
                href="/learning"
                className="inline-flex items-center text-uranium-alt font-semibold hover:underline">
                Start Learning →
              </Link>
            </div>

            {/* Atomic Adventures */}
            <div className="bg-gradient-to-br from-rusty/10 to-cherenkov/10 p-8 rounded-xl border-l-4 border-rusty hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-rusty/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">🎮</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Atomic Adventures
                  </h3>
                  <p className="text-rusty font-semibold">Interactive Games</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Experience the future of nuclear technology through immersive
                choose-your-own-adventure games set in worlds powered by
                advanced atomic energy.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-center space-x-2">
                  <span className="text-rusty">•</span>
                  <span>Sci-fi scenarios with real science</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rusty">•</span>
                  <span>Multiple storylines and endings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rusty">•</span>
                  <span>Educational content woven into gameplay</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-rusty">•</span>
                  <span>Community-created adventures</span>
                </li>
              </ul>
              <Link
                href="/adventure"
                className="inline-flex items-center text-rusty font-semibold hover:underline">
                Begin Adventure →
              </Link>
            </div>

            {/* Atomic Who's Who */}
            <div className="bg-gradient-to-br from-graphite/10 to-dark-charcoal/10 p-8 rounded-xl border-l-4 border-graphite hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-graphite/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">👥</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Atomic Who's Who
                  </h3>
                  <p className="text-graphite font-semibold">
                    Member Directory
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Meet the brilliant minds driving nuclear innovation. Connect
                with industry leaders, researchers, and fellow enthusiasts in
                our member directory.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-center space-x-2">
                  <span className="text-graphite">•</span>
                  <span>Industry expert profiles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-graphite">•</span>
                  <span>Professional networking opportunities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-graphite">•</span>
                  <span>Career mentorship connections</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-graphite">•</span>
                  <span>Collaboration and partnership opportunities</span>
                </li>
              </ul>
              <Link
                href="/whos-who"
                className="inline-flex items-center text-graphite font-semibold hover:underline">
                Meet the Community →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It All Works Together */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">
              A Connected Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These platforms work together to create a comprehensive learning
              and networking experience that accelerates your journey in nuclear
              energy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-card p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  Learn → Discuss → Connect → Explore
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-uranium-alt rounded-full flex items-center justify-center text-graphite font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">
                        Start with Learning
                      </h4>
                      <p className="text-muted-foreground">
                        Build your foundation with Atomic Learning's structured
                        courses and bite-sized lessons.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-cherenkov rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">
                        Join the Discussion
                      </h4>
                      <p className="text-muted-foreground">
                        Share insights and ask questions in Atomic Flux's
                        vibrant community discussions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-graphite rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">
                        Network with Experts
                      </h4>
                      <p className="text-muted-foreground">
                        Connect with industry leaders and peers through Atomic
                        Who's Who.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-rusty rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">
                        Explore Possibilities
                      </h4>
                      <p className="text-muted-foreground">
                        Experience the future through Atomic Adventures'
                        immersive scenarios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cherenkov/5 to-uranium-alt/5 p-12 rounded-2xl text-center">
              <div className="text-6xl mb-6">⚛️</div>
              <h3 className="text-3xl font-bold mb-6 text-card-foreground">
                The Power of Community
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                When brilliant minds come together, amazing things happen. Join
                thousands of professionals, students, and enthusiasts who are
                shaping the future of nuclear energy.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cherenkov">1000+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Members
                  </div>
                </div>
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-uranium-alt">50+</div>
                  <div className="text-sm text-muted-foreground">
                    Expert Contributors
                  </div>
                </div>
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-rusty">200+</div>
                  <div className="text-sm text-muted-foreground">
                    Learning Modules
                  </div>
                </div>
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-graphite">24/7</div>
                  <div className="text-sm text-muted-foreground">
                    Community Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cherenkov to-uranium-alt">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Join the Atomic Revolution?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Don't just learn about nuclear energy—be part of the community
            that's building the future. Your journey starts with a single step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/why-join/membership-level"
              className="bg-white text-cherenkov font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-xl">
              Choose Your Membership
            </Link>
            <Link
              href="/whos-who"
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-cherenkov transition-all duration-200 text-xl">
              Meet Our Members
            </Link>
          </div>
          <p className="mt-8 text-white/70 text-lg">
            Join the community that's solving humanity's greatest energy
            challenges.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
