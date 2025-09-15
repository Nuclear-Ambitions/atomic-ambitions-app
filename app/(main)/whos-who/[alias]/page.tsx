import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sampleProfiles, Profile } from "../../../lib/data/sample";

interface ProfilePageProps {
  params: {
    alias: string;
  };
}

// Helper function to find profile by alias
function findProfileByAlias(alias: string): Profile | undefined {
  return sampleProfiles.find(
    (profile) => profile.alias?.toLowerCase() === alias.toLowerCase()
  );
}

// Helper function to format date
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Helper function to get time since joining
function getTimeSinceJoining(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const profile = findProfileByAlias(params.alias);

  if (!profile) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/whos-who"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Who's Who
          </Link>
        </div>

        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={`${profile.alias} avatar`}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-30 h-30 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-muted-foreground">
                    {profile.alias?.charAt(0) || "?"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-card-foreground mb-2">
                {profile.alias}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                {profile.location && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {profile.location}
                  </div>
                )}

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Joined {formatDate(profile.joinedAt)} (
                  {getTimeSinceJoining(profile.joinedAt)})
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <span className="text-highlight font-medium">
                    {profile.karmaScore} karma
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline text-sm">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Website
                  </a>
                )}

                {profile.xUsername && (
                  <a
                    href={`https://x.com/${profile.xUsername.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline text-sm">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    {profile.xUsername}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {profile.bio && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              About
            </h2>
            <p className="text-card-foreground leading-relaxed">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Join Reason */}
        {profile.joinReason && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Why I Joined
            </h2>
            <p className="text-card-foreground leading-relaxed">
              {profile.joinReason}
            </p>
          </div>
        )}

        {/* Nuclear Interests */}
        {profile.nuclearLikes && profile.nuclearLikes.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Nuclear Interests
            </h2>
            <div className="flex flex-wrap gap-3">
              {profile.nuclearLikes.map((like, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
                  {like}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="card text-center">
          <h3 className="text-xl font-bold text-card-foreground mb-3">
            Connect with {profile.alias}
          </h3>
          <p className="text-muted-foreground mb-4">
            Want to connect with {profile.alias} or other members of our
            community?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/why-join" className="btn btn-primary">
              Join Atomic Ambitions
            </Link>
            <Link href="/whos-who" className="btn btn-outline">
              Browse More Members
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
