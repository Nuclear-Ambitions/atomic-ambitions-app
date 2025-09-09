import { ThemeToggle } from "./components/theme-toggle";
import Image from "next/image";

// Reusable Join Form Component
function JoinForm({
  title = "Join Us",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className={`card max-w-md mx-auto ${className}`}>
      <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
      <form className="space-y-4">
        <input type="email" placeholder="Enter your email" className="input" />
        <button type="submit" className="btn btn-primary w-full">
          Subscribe
        </button>
      </form>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Benefit Item Component
function BenefitItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />

      {/* Header */}
      <header className="py-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-bold tracking-wider">
            Atomic Ambitions
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Image
                  src="/nuclear-power-plant.jpg"
                  alt="Nuclear Power Plant"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Welcome to the Atomic Future
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Discover the power of atomic innovation and sustainable energy
                  solutions. We&apos;re pioneering the next generation of
                  nuclear technology to create a cleaner, more efficient world
                  for future generations.
                </p>
                <JoinForm />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Platform Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the comprehensive suite of tools and resources designed
                to advance atomic energy innovation.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                title="Atomic Flux"
                description="Real-time monitoring and analysis of nuclear reactor performance and energy output."
                icon="⚡"
              />
              <FeatureCard
                title="Atomic Learning"
                description="Educational resources and training programs for nuclear energy professionals."
                icon="📚"
              />
              <FeatureCard
                title="Atomic Adventures"
                description="Interactive simulations and virtual experiences in nuclear technology."
                icon="🎮"
              />
              <FeatureCard
                title="Alchemy Lab"
                description="Research and development tools for nuclear material science and innovation."
                icon="🧪"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Benefits of Joining
                </h2>
                <div className="space-y-6">
                  <BenefitItem
                    title="Full Platform Access"
                    description="Complete participation in all platform activities, including advanced simulations, research tools, and collaborative projects."
                  />
                  <BenefitItem
                    title="Directory Listing"
                    description="Get featured in our professional directory, connecting you with industry leaders, researchers, and innovators worldwide."
                  />
                  <BenefitItem
                    title="Recognition & Credibility"
                    description="Be recognized as a proponent of atomic energy advancement and gain credibility in the nuclear technology community."
                  />
                </div>
              </div>
              <div>
                <JoinForm title="Join Our Community" />
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                About Atomic Ambitions
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Atomic Ambitions was born from a vision to accelerate the
                development and adoption of safe, efficient nuclear energy
                technologies. We believe that atomic energy holds the key to
                solving our planet&apos;s energy challenges while maintaining
                environmental sustainability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our platform serves as a bridge between researchers, engineers,
                policymakers, and the public, fostering collaboration and
                knowledge sharing that drives innovation forward. Through
                education, simulation, and real-world application, we&apos;re
                building a community dedicated to advancing atomic energy for
                the benefit of all.
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="card text-center">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    How You Can Help
                  </h3>
                  <p className="text-muted-foreground">
                    Contribute your expertise, participate in research projects,
                    share knowledge, and help educate others about the benefits
                    of atomic energy.
                  </p>
                </div>
                <div className="card text-center">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    How We Help You
                  </h3>
                  <p className="text-muted-foreground">
                    Access cutting-edge tools, connect with industry leaders,
                    advance your career, and be part of the solution to global
                    energy challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">©2025 Atomic Ambitions LLC</p>
        </div>
      </footer>
    </div>
  );
}
