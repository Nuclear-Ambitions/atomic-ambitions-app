import React from "react";
import Link from "next/link";

const MembershipLevelPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-nuclear">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Choose Your Impact Level
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            You've seen what's possible. You know the problems we're solving.
            Now it's time to decide how deeply you want to be involved in
            building the future.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-white/90 text-lg mb-4">
              <strong>Remember:</strong> The total value we calculated was
              $21,500+ per year
            </p>
            <p className="text-white text-xl">
              But you'll pay less than most people spend on coffee each month.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Membership */}
            <div className="bg-muted p-8 rounded-2xl border-2 border-muted">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Explorer
                </h3>
                <div className="text-4xl font-bold text-card-foreground mb-2">
                  Free
                </div>
                <p className="text-muted-foreground">
                  Perfect for getting started
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Access to public forums and discussions
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Basic educational resources
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Member directory access
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-muted-foreground">
                    Premium content and research papers
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-muted-foreground">
                    Exclusive networking events
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-muted-foreground">
                    Early access to job opportunities
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-muted-foreground">
                    Direct access to industry experts
                  </span>
                </div>
              </div>

              <button className="w-full bg-muted text-card-foreground font-semibold py-3 px-6 rounded-lg cursor-not-allowed opacity-50">
                Free Forever
              </button>
            </div>

            {/* Monthly Membership - Most Popular */}
            <div className="bg-gradient-to-br from-cherenkov/10 to-uranium-alt/10 p-8 rounded-2xl border-2 border-cherenkov relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-cherenkov text-white px-4 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Innovator
                </h3>
                <div className="text-4xl font-bold text-cherenkov mb-2">
                  $11
                </div>
                <p className="text-muted-foreground">per month</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Less than a Netflix subscription
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Everything in Explorer
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Premium research papers and reports
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Exclusive monthly webinars
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Early access to job postings
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Direct messaging with experts
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">Priority support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Access to private collaboration projects
                  </span>
                </div>
              </div>

              <button className="w-full bg-cherenkov text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg">
                Start Monthly Plan
              </button>
            </div>

            {/* Annual Membership - Best Value */}
            <div className="bg-gradient-to-br from-uranium-alt/10 to-rusty/10 p-8 rounded-2xl border-2 border-uranium-alt relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-uranium-alt text-graphite px-4 py-2 rounded-full text-sm font-bold">
                  Best Value
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Visionary
                </h3>
                <div className="text-4xl font-bold text-uranium-alt mb-2">
                  $111
                </div>
                <p className="text-muted-foreground">per year</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-semibold">
                  Save $21 (16% off monthly)
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Less than $0.31 per day
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Everything in Innovator
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Exclusive annual conference access
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Priority access to new features
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    1-on-1 mentoring sessions
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Exclusive startup opportunities
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Advanced analytics and insights
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-card-foreground">
                    Founding member badge
                  </span>
                </div>
              </div>

              <button className="w-full bg-uranium-alt text-graphite font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg">
                Start Annual Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Reinforcement Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">
              Still Think About the Cost?
            </h2>
            <p className="text-xl text-graphite/80 dark:text-light-gray/80 max-w-3xl mx-auto">
              Let's put this in perspective. What else could you spend $11 on?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-xl text-center shadow-lg">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                3 Coffee Drinks
              </h3>
              <p className="text-muted-foreground text-sm">
                Or access to a community building the future of clean energy
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl text-center shadow-lg">
              <div className="text-4xl mb-4">🍕</div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                1 Pizza Slice
              </h3>
              <p className="text-muted-foreground text-sm">
                Or networking with industry experts and innovators
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl text-center shadow-lg">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                1 Movie Ticket
              </h3>
              <p className="text-muted-foreground text-sm">
                Or early access to breakthrough research and opportunities
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl text-center shadow-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">
                Phone App
              </h3>
              <p className="text-muted-foreground text-sm">
                Or contributing to solutions that could power humanity for
                centuries
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-cherenkov to-uranium-alt p-8 rounded-2xl text-white max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">The Real Question Is:</h3>
              <p className="text-xl mb-6 opacity-90">
                Can you afford NOT to be part of the clean energy revolution?
              </p>
              <p className="text-lg opacity-80">
                Every day you wait is another day of missed opportunities,
                connections, and impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-card-foreground">
              Common Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-muted p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Can I cancel anytime?
              </h3>
              <p className="text-graphite/80 dark:text-light-gray/80">
                Absolutely. No long-term contracts, no hidden fees. Cancel
                whenever you want, though we're confident you'll want to stay
                once you see the value.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                What if I'm not satisfied?
              </h3>
              <p className="text-graphite/80 dark:text-light-gray/80">
                We offer a 30-day money-back guarantee. If you're not completely
                satisfied with your membership within the first 30 days, we'll
                refund your payment, no questions asked.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Do you offer student discounts?
              </h3>
              <p className="text-graphite/80 dark:text-light-gray/80">
                Yes! Students and recent graduates (within 2 years) can get 50%
                off any paid plan. Just contact us with proof of enrollment or
                graduation.
              </p>
            </div>

            <div className="bg-muted p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                How do I know this is worth it?
              </h3>
              <p className="text-graphite/80 dark:text-light-gray/80">
                Start with our free Explorer membership and see what we're
                about. Read our member testimonials, explore the content, and
                meet some of our community. Then upgrade when you're ready for
                more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-nuclear">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Make Your Choice?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            The future of clean energy is being built right now. The question
            isn't whether you'll be part of it—it's how much you want to
            contribute to making it happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button className="bg-cherenkov text-white font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg">
              Start Monthly Plan - $11/month
            </button>
            <button className="bg-uranium-alt text-graphite font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg text-lg">
              Start Annual Plan - $111/year
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-graphite transition-all duration-200">
              Start Free Explorer Membership
            </button>
            <Link
              href="/whos-who"
              className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-graphite transition-all duration-200">
              Meet Our Members First
            </Link>
          </div>

          <p className="mt-8 text-white/70 text-lg">
            30-day money-back guarantee • Cancel anytime • Join thousands of
            members worldwide
          </p>
        </div>
      </section>
    </div>
  );
};

export default MembershipLevelPage;
