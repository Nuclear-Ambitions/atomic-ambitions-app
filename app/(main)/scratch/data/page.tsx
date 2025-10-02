import { db } from "@/lib/db/Database";

export default async function DataPage() {
  const data = await db.selectFrom("playing_with_neon").selectAll().execute();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Playing with Neon Data</h1>
      <ol className="list-decimal list-inside space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-2 border rounded">
            <strong>{item.name}</strong>
            {item.value !== null && (
              <span className="ml-2 text-gray-600">(Value: {item.value})</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
