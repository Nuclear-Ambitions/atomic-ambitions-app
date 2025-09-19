import JoinCta from "../components/join-cta";
import FeatureCard from "../components/feature-card";
import BenefitItem from "../components/benefit-item";
import Attribution from "../components/attribution";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    key: "atomic-lessons",
    title: "Atomic Lessons",
    description:
      "Short lessons. Each one focuses on a specific concept. Study a little every day, or binge-learn a whole batch at once. Before you know it, ideas will start to click into place. Your atomic IQ will rise.",
    icon: "📚",
    href: "/lessons",
  },
  {
    key: "atomic-flux",
    title: "Atomic Flux",
    description:
      "A social discussion forum. Share your ideas and react to others. Hot topics might start a chain reaction.",
    icon: "⚡",
    href: "/flux",
  },
  {
    key: "adventures",
    title: "Adventures",
    description:
      "We are working on an epic series. Kind of like Harry Potter or the Avengers. Our first adventure is still unfolding. Give it a try, and tell us what you think.",
    icon: "🏔️",
    href: "/adventures",
  },
  {
    key: "alchemy-lab",
    title: "Alchemy Lab",
    description:
      "Explore atomic concepts using these simulations and thought experiments.",
    icon: "🧪",
    href: "/alchemy-lab",
  },
];

const benefits = [
  {
    title: "Full Platform Access",
    description:
      "Unlock platform features at a basic level. Post on Flux. Record progress through lessons. Save adventure game status.",
  },
  {
    title: "Professional Directory Listing",
    description:
      "Get your own page in our Atomic Who directory, alongside other members, advocates and leaders.",
  },
  {
    title: "Earn Atomic Karma",
    description:
      "Accrue karma points as you participate. Get rewarded by joining, setting up a profile page, posting on Flux, and more.",
  },
  {
    title: "Bragging Rights",
    description:
      "Atomic energy is a complicated subject. Gain the respect of others for hanging out with the smart crowd.",
  },
];

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
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Atomic energy is everywhere. It&apos;s a fundamental part of
                    how the universe works. Stuff is made from atoms, and atoms
                    are loaded with an unbelievable amount of energy.
                  </p>
                  <p>
                    You have found a platform that supports people who believe
                    in the power of atomic energy to help humanity thrive. If
                    you are already a fan of the biggest untapped source of
                    energy the universe has to offer, you are most welcome here.
                    If you are curious about atomic energy, please enjoy
                    learning all about it.
                  </p>
                  <p>
                    If you are a skeptic, your ideas about atomic energy may be
                    due for an update. Why not challenge your beliefs? See if
                    you can understand why atomic energy is amazing.
                  </p>
                  <p>
                    Our aim is to provide a space where information and ideas
                    about atomic energy are readily available and easily shared.
                    We also hope to make the experience fun. Something you will
                    enjoy for years to come.
                  </p>
                </div>
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
              {features.map((feature) => (
                <FeatureCard
                  key={feature.key}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  href={feature.href}
                />
              ))}
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
                <h2 className="text-3xl font-bold text-highlight mb-6">
                  Benefits of Joining
                </h2>
                <div className="space-y-6">
                  {benefits.map((benefit) => (
                    <BenefitItem
                      key={benefit.title}
                      title={benefit.title}
                      description={benefit.description}
                    />
                  ))}
                </div>
              </div>
              <div>
                <JoinCta title="Join Our Community" />
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-highlight mb-6">
                About Atomic Ambitions
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Atomic Ambitions was born from a vision of a thriving society,
                  supported by abundant, clean, atomic energy. We want to
                  encourage people to replace their fears with myth-busting
                  truths. We want to help people feel good about relying on
                  atomic energy to improve the quality of life for everyone.
                </p>
                <p>
                  Anyone who wants to make a positive global impact should
                  support the productive use of atomic energy. Through
                  exploration, education, and open-minded discussion, we want to
                  help people form a rational view of this infinite source of
                  energy.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <JoinCta
                  title="How You Can Help"
                  encouragement="Join the Atomic Ambitions platform. Contribute your expertise. Answer questions in a friendly way. Try to understand what holds others back."
                  buttonText="Share Your Expertise"
                />
                <JoinCta
                  title="How We Help You"
                  encouragement="Join the Atomic Ambitions platform. Ask questions. Keep an open mind to the answers you get. See if any ideas need an upgrade."
                  buttonText="Give It a Try"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
