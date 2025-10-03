'use client'

import { useEffect, useState } from 'react'

interface PlayingWithNeonItem {
  id: number;
  name: string;
  value: number | null;
}

export default function DataPage() {
  const [data, setData] = useState<PlayingWithNeonItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/playing-with-neon')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result as PlayingWithNeonItem[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Playing with Neon Data</h1>
        <div className='flex items-center justify-center py-8'>
          <div className='text-gray-600'>Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Playing with Neon Data</h1>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Playing with Neon Data</h1>
      <ol className='list-decimal list-inside space-y-2'>
        {data.map((item) => (
          <li key={item.id} className='p-2 border rounded'>
            <strong>{item.name}</strong>
            {item.value !== null && (
              <span className='ml-2 text-gray-600'>(Value: {item.value})</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
