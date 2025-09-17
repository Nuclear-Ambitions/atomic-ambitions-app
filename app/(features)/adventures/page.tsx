export default function AdventuresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Ready for Fun?
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Ready for some exciting games and challenges? Let&apos;s explore what
          adventures await!
        </p>
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">
            🎮 Ready to Play?
          </h2>
          <p className="text-card-foreground mb-6">
            We&apos;re preparing some amazing games and interactive experiences
            for you. Stay tuned as we add more exciting content!
          </p>
          <div className="text-sm text-muted-foreground">
            More games and adventures coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}
