import { createSignal } from 'solid-js'
import { Highlight } from '../highlight'

export const WithInput = () => {
  const [query, setQuery] = createSignal('ipsum')
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={query()}
        onInput={(e) => setQuery(e.target.value)}
      />
      <br />
      <Highlight
        ignoreCase={false}
        query={query()}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt"
      />
    </div>
  )
}
