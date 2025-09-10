export default function Attribution({
  artist,
  artistLink,
  source,
  sourceLink,
}: {
  artist: string;
  artistLink: string;
  source: string;
  sourceLink: string;
}) {
  return (
    <div>
      <div className="mt-1 text-sm text-muted">
        Photo by <a href={artistLink}>{artist}</a> on{" "}
        <a href={sourceLink}>{source}</a>
      </div>
    </div>
  );
}
