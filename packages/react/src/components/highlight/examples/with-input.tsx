import { useState } from 'react'
import { Highlight } from '../highlight'

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
