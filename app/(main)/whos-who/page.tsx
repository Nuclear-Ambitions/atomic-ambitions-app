import Link from "next/link";
import Image from "next/image";
import { sampleProfiles, Profile } from "../../lib/data/sample";

// Member Card Component
function MemberCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href={`/whos-who/${profile.alias}`}
      className="card hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={`${profile.alias} avatar`}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">
                {profile.alias?.charAt(0) || "?"}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-card-foreground mb-1">
            {profile.alias}
          </h3>

          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {profile.nuclearLikes?.slice(0, 3).map((like, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {like}
              </span>
            ))}
            {profile.nuclearLikes && profile.nuclearLikes.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{profile.nuclearLikes.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{profile.location}</span>
            <div className="flex items-center space-x-2">
              <span className="text-highlight font-medium">
                {profile.karmaScore} karma
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function WhosWhoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Atomic Who
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the brilliant minds driving the future of nuclear energy. Our
            community of engineers, scientists, and advocates working together
            to advance clean, safe, and sustainable nuclear technology.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Community Members ({sampleProfiles.length})
            </h2>
            <div className="text-sm text-muted-foreground">
              Click on any card to view their full profile
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProfiles.map((profile) => (
              <MemberCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              Join Our Community
            </h3>
            <p className="text-muted-foreground mb-4">
              Ready to connect with fellow nuclear professionals and advocates?
              Join Atomic Ambitions and become part of the conversation.
            </p>
            <Link href="/why-join" className="btn btn-primary">
              Learn More About Joining
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
