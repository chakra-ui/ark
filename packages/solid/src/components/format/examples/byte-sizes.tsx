import { For } from 'solid-js'
import { Format } from '../..'

export const ByteSizes = () => {
  const byteSizes = [50, 5000, 5000000, 5000000000]

  return (
    <div>
      <For each={byteSizes}>
        {(size) => (
          <div>
            <Format.Byte value={size} />
          </div>
        )}
      </For>
    </div>
  )
}
