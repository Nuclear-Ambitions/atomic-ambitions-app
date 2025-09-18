import React from "react";
import Link from "next/link";

const WhyJoinPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-nuclear">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            The Future of Energy Starts Here
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Blargy blargy blargy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/why-join/membership-level"
              className="bg-cherenkov text-white font-semibold py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg">
              Start Your Journey
            </Link>
            <a
              href="#problems"
              className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-graphite transition-all duration-200 text-lg">
              Blargy
            </a>
          </div>
        </div>
      </section>

      {/* The Problems We Face Section */}
      <section id="problems" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">
              The Biggest Problems Are Often Emotional
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Blargy blargy blargy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-rusty/10 to-cherenkov/10 p-8 rounded-xl border-l-4 border-rusty">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  Climate Anxiety vs. Climate Action
                </h3>
                <p className="text-muted-foreground mb-4">
                  Blargy blargy blargy.
                </p>
                <p className="text-muted-foreground">Blargy blargy blargy.</p>
              </div>

              <div className="bg-gradient-to-r from-cherenkov/10 to-uranium-alt/10 p-8 rounded-xl border-l-4 border-cherenkov">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  The Knowledge Gap
                </h3>
                <p className="text-muted-foreground mb-4">
                  Blargy blargy blargy.
                </p>
                <p className="text-muted-foreground">Blargy blargy blargy.</p>
              </div>

              <div className="bg-gradient-to-r from-uranium-alt/10 to-rusty/10 p-8 rounded-xl border-l-4 border-uranium-alt">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  The Innovation Bottleneck
                </h3>
                <p className="text-muted-foreground mb-4">
                  Blargy blargy blargy.
                </p>
                <p className="text-muted-foreground">Blargy blargy blargy.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cherenkov/5 to-uranium-alt/5 p-12 rounded-2xl text-center">
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-3xl font-bold mb-6 text-card-foreground">
                Blargy blargy blargy.
              </h3>
              <div className="space-y-6 text-left">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cherenkov rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <p className="text-card-foreground">
                    <strong>Clean energy for 8 billion people</strong> without
                    compromising our climate goals
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cherenkov rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <p className="text-card-foreground">Blargy blargy blargy.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cherenkov rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <p className="text-card-foreground">
                    <strong>Medical breakthroughs</strong> treating cancer and
                    other diseases
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cherenkov rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <p className="text-card-foreground">
                    <strong>Space exploration</strong> powered by nuclear
                    propulsion
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/why-join/membership-level"
              className="bg-cherenkov text-white font-semibold py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg inline-block">
              I Want to Be Part of This Future
            </Link>
          </div>
        </div>
      </section>

      {/* The Value Proposition Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">
              Blargy blargy blargy.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Blargy blargy blargy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-8 rounded-xl shadow-lg border border-cherenkov/20">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-4 text-cherenkov">
                Expert Knowledge
              </h3>
              <p className="text-card-foreground mb-4">
                Access to industry professionals, research papers, and technical
                discussions that would cost thousands in consulting fees.
              </p>
              <div className="text-sm text-muted-foreground">
                Value: $2,000+ per year
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-cherenkov/20">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-4 text-cherenkov">
                Professional Network
              </h3>
              <p className="text-card-foreground mb-4">
                Connect with engineers, researchers, and entrepreneurs who are
                building the future of energy.
              </p>
              <div className="text-sm text-muted-foreground">
                Value: $5,000+ per year
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-cherenkov/20">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-4 text-cherenkov">
                Career Opportunities
              </h3>
              <p className="text-card-foreground mb-4">
                Early access to job postings, startup opportunities, and
                collaboration projects in the nuclear sector.
              </p>
              <div className="text-sm text-muted-foreground">
                Value: $10,000+ per year
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-cherenkov/20">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-4 text-cherenkov">
                Educational Resources
              </h3>
              <p className="text-card-foreground mb-4">
                Curated content, courses, and learning materials that would cost
                hundreds in traditional education.
              </p>
              <div className="text-sm text-muted-foreground">
                Value: $1,500+ per year
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-cherenkov/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4 text-cherenkov">
                Early Access
              </h3>
              <p className="text-card-foreground mb-4">
                Be among the first to know about industry developments, policy
                changes, and technological breakthroughs.
              </p>
              <div className="text-sm text-muted-foreground">
                Value: $3,000+ per year
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-cherenkov/20">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-4 text-cherenkov">
                Innovation Platform
              </h3>
              <p className="text-card-foreground mb-4">
                Contribute to projects that could shape the future of clean
                energy and make a real impact.
              </p>
              <div className="text-sm text-muted-foreground">
                Value: Priceless
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cherenkov to-uranium-alt p-8 rounded-2xl text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Total Value: $21,500+ per year
            </h3>
            <p className="text-xl mb-6 opacity-90">Blargy blargy blargy.</p>
            <Link
              href="/why-join/membership-level"
              className="btn btn-outline-highlight">
              See Our Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Curiosity Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">
              What If You Could See the Future?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Not through a crystal ball, but through the eyes of those who are
              building it right now.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-uranium-alt/10 to-cherenkov/10 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  The Questions That Keep Us Up at Night
                </h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <span className="text-cherenkov font-bold">•</span>
                    <span>
                      How do we power a Mars colony with nuclear energy?
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-cherenkov font-bold">•</span>
                    <span>
                      Can we use nuclear waste to create new medical treatments?
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-cherenkov font-bold">•</span>
                    <span>
                      What if small modular reactors could power entire cities?
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-cherenkov font-bold">•</span>
                    <span>
                      How do we make nuclear energy so safe that people embrace
                      it?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-cherenkov/10 to-rusty/10 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  Blargy blargy blargy.
                </h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <span className="text-uranium-alt font-bold">•</span>
                    <span>
                      Fusion reactors that could be commercially viable by 2030
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-uranium-alt font-bold">•</span>
                    <span>Nuclear batteries that last for decades</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-uranium-alt font-bold">•</span>
                    <span>AI-powered reactor control systems</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-uranium-alt font-bold">•</span>
                    <span>
                      New materials that make reactors safer and more efficient
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-graphite-light/20 to-dark-charcoal/20 dark:from-dark-charcoal/40 dark:to-graphite/40 p-12 rounded-2xl">
              <h3 className="text-3xl font-bold mb-8 text-center text-card-foreground">
                Imagine Being Part of This
              </h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl mb-4">🌍</div>
                  <p className="text-lg text-card-foreground">
                    Contributing to solutions that could power the world cleanly
                    for centuries
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">🔬</div>
                  <p className="text-lg text-card-foreground">
                    Learning from the brightest minds in nuclear science and
                    engineering
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">⚛️</div>
                  <p className="text-lg text-card-foreground">
                    Being part of discoveries that could change everything
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/why-join/membership-level"
              className="bg-uranium-alt text-graphite font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg inline-block">
              Blargy blargy blargy.
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Future Is Being Built Now
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Blargy blargy blargy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center">
            <Link
              href="/why-join/membership-level"
              className="btn btn-primary m-4">
              Join the Revolution
            </Link>
            <Link href="/whos-who" className="btn btn-secondary m-4">
              Meet Our Members
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/why-join/features"
              className="btn btn-outline-highlight my-4">
              Explore Our Features
            </Link>
          </div>
          <p className="mt-8 text-white/70 text-lg">
            Join thousands of engineers, scientists, and visionaries who are
            already building tomorrow.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhyJoinPage;
