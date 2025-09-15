export interface Profile {
  id: string;
  alias: string | null;
  avatarUrl: string | null;
  bio: string | null;
  joinReason: string | null;
  joinedAt: Date;
  location: string | null;
  nuclearLikes: string[] | null;
  website: string | null;
  xUsername: string | null;
  karmaScore: number;
  createdAt: Date;
  updatedAt: Date;
}

// Sample profiles with join dates from August and first half of September
export const sampleProfiles: Profile[] = [
  {
    id: "profile-001",
    alias: "Fiona",
    avatarUrl: "https://cdn.worldofnuclear.com/static/images/adventure/lab-tech-female.jpg",
    bio: "Nuclear engineer with 8 years of experience in reactor design. Passionate about clean energy and sustainable nuclear technology. Love hiking and reading sci-fi novels.",
    joinReason: "Looking to connect with fellow nuclear professionals and share knowledge about advanced reactor technologies.",
    joinedAt: new Date("2024-08-15T10:30:00Z"),
    location: "Oak Ridge, Tennessee",
    nuclearLikes: ["Small Modular Reactors", "Nuclear Fusion", "Waste Management", "Safety Systems"],
    website: "https://worldofnuclear.com",
    xUsername: "@FionaNuclear",
    karmaScore: 127,
    createdAt: new Date("2024-08-15T10:30:00Z"),
    updatedAt: new Date("2024-09-10T14:22:00Z")
  },
  {
    id: "profile-002",
    alias: "Zanzibar",
    avatarUrl: "https://cdn.worldofnuclear.com/static/images/shared/Zanzibar.jpg",
    bio: "Physics PhD student researching quantum mechanics applications in nuclear physics. Amateur photographer and chess enthusiast. Always up for a good debate about energy policy.",
    joinReason: "Want to learn from industry experts and contribute to discussions about the future of nuclear energy.",
    joinedAt: new Date("2024-08-28T16:45:00Z"),
    location: "Cambridge, Massachusetts",
    nuclearLikes: ["Quantum Computing", "Nuclear Medicine", "Particle Physics", "Energy Storage"],
    website: null,
    xUsername: "@ZanzibarNuclear",
    karmaScore: 89,
    createdAt: new Date("2024-08-28T16:45:00Z"),
    updatedAt: new Date("2024-09-12T09:15:00Z")
  },
  {
    id: "profile-003",
    alias: "Shilpa",
    avatarUrl: "https://cdn.worldofnuclear.com/static/images/adventure/smart-female-nuclear-engineer-2.jpg",
    bio: "Environmental scientist turned nuclear advocate. Worked in renewable energy for 5 years before realizing nuclear is essential for our clean energy future. Mom of two, coffee addict.",
    joinReason: "Excited to be part of a community that understands the critical role nuclear energy plays in combating climate change.",
    joinedAt: new Date("2024-09-08T08:20:00Z"),
    location: "Seattle, Washington",
    nuclearLikes: ["Climate Solutions", "Grid Stability", "Public Education", "Policy Advocacy"],
    website: "https://nuclearambitions.com",
    xUsername: "@ShilpaNuclear",
    karmaScore: 156,
    createdAt: new Date("2024-09-08T08:20:00Z"),
    updatedAt: new Date("2024-09-14T11:30:00Z")
  }
];

