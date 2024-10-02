import { Highlight } from '@ark-ui/react/highlight'
import { useState } from 'react'

export const WithInput = () => {
  const [query, setQuery] = useState('ipsum')
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <Highlight
        query={query}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt"
      />
    </div>
  )
}
