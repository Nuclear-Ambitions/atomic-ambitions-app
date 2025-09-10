export default function Attribution({
  artist,
  artistLink,
  source,
  sourceLink,
  children,
}: {
  artist: string;
  artistLink: string;
  source: string;
  sourceLink: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block">
      {children}
      <div className="mt-1 text-sm text-muted-">
        Photo by{" "}
        <a href={artistLink} className="underline">
          {artist}
        </a>{" "}
        on{" "}
        <a href={sourceLink} className="underline">
          {source}
        </a>
      </div>
    </div>
  );
}
