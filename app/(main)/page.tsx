import JoinForm from "../components/join-form";
import FeatureCard from "../components/feature-card";
import BenefitItem from "../components/benefit-item";
import Attribution from "../components/attribution";
import Image from "next/image";

export default function Home() {
  return (
    <div>
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
                <h2 className="text-4xl font-bold text-highlight mb-6">
                  Welcome to the Atomic Future
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Atomic energy is everywhere. It&apos;s a fundamental part of
                  how the universe works. Stuff is made from atoms, and atoms
                  are loaded with an unbelievable amount of energy.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  You have found a platform that supports people who believe in
                  the power of atomic energy to help humanity thrive. If you are
                  already a fan of the biggest untapped source of energy the
                  universe has to offer, you are most welcome here. If you are
                  curious about atomic energy, please enjoy learning all about
                  it.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  If you are a skeptic, your ideas about atomic energy may be
                  due for an update. Why not challenge your beliefs? See if you
                  can understand why atomic energy is amazing.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Our aim is to provide a space where information and ideas
                  about atomic energy are readily available and easily shared.
                  We also hope to make the experience fun. Something you will
                  enjoy for years to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 space-y-12">
            <div className="text-center mb-12 space-y-6">
              <h2 className="text-highlight">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Learning happens in a variety of ways. Atomic Ambitions offers a
                variety of features for exploring ideas about and related to
                atomic energy. Here are some favorites.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                title="Atomic Lessons"
                description="Short lessons. Each one focuses on a specific concept. Study a little every day, or binge-learn a whole batch at once. Before you know it, ideas will start to click into place. Your atomic IQ will rise."
                icon="📚"
              />
              <FeatureCard
                title="Atomic Flux"
                description="A social discussion forum. Share your ideas and react to others. Hot topics might start a chain reaction."
                icon="⚡"
              />
              <FeatureCard
                title="Adventures"
                description="We are working on an epic series. Kind of like Harry Potter or the Avengers. Our first adventure is still unfolding. Give it a try, and tell us what you think."
                icon="🏔️"
              />
              <FeatureCard
                title="Alchemy Lab"
                description="Explore atomic concepts using these simulations and thought experiments."
                icon="🧪"
              />
            </div>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Members get full access to these features and more.
            </p>
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
                <Image
                  src="/atomic-ambitions-logo-bdr.png"
                  alt="Atomic Ambitions Logo"
                  width={420}
                  height={130}
                  className="mb-12"
                />
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
    </div>
  );
}
