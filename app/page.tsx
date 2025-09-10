import { ThemeToggle } from "./components/theme-toggle";
import JoinForm from "./components/join-form";
import FeatureCard from "./components/feature-card";
import BenefitItem from "./components/benefit-item";
import Attribution from "./components/attribution";
import Image from "next/image";

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
                <Attribution
                  artist="Patrick Federi"
                  artistLink="https://unsplash.com/@federi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                  source="Unsplash"
                  sourceLink="https://unsplash.com/photos/white-smoke-coming-out-from-green-field-uvtUELc92SI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                  <Image
                    src="/nuclear-power-plant.jpg"
                    alt="Nuclear Power Plant"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </Attribution>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Welcome to the Atomic Future
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Atomic energy is everywhere. Stuff is made from atoms, and
                  each atom is loaded with an amazing amount of energy. Some
                  atoms are ready to burst. They just need a little push.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  If you already are a fan of atomic energy? Do you want to find
                  out what atomic energy can do for us? Join us for full access.
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
                Featuring...
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We have lots of ways to learn about atomic energy and related
                topics. Take your time and explore these features.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                title="Atomic Flux"
                description="A collegial social discussion forum for exchanging ideas about atomic energy and anything else."
                icon="⚡"
              />
              <FeatureCard
                title="Atomic Learning"
                description="Short lessons for understanding the fundamentals of atomic energy. We try to make them interesting and memorable."
                icon="📚"
              />
              <FeatureCard
                title="Atomic Adventures"
                description="We are working on an epic series. Kind of like Harry Potter or the Avengers. Still early days, but give it a try, and tell us what you think."
                icon="🏔️"
              />
              <FeatureCard
                title="Alchemy Lab"
                description="Explore atomic concepts using these simulations and thought experiments."
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
          <p className="text-lg">©2025 Nuclear Ambitions LLC</p>
        </div>
      </footer>
    </div>
  );
}
