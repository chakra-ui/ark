import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

function loadData() {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(['React', 'Solid', 'Vue', 'Svelte', 'Angular', 'Ember']), 500)
  })
}

export const Async = () => {
  const [items, setItems] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const collection = createListCollection<string>({
    items: items || [],
  })

  const handleOpenChange = (details: Select.OpenChangeDetails) => {
    if (details.open && items == null) {
      setLoading(true)
      setError(null)
      loadData()
        .then((data) => setItems(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }
  }

  return (
    <Select.Root collection={collection} onOpenChange={handleOpenChange}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select" />
          <Select.Indicator>
            <ChevronDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              collection.items.map((item) => (
                <Select.Item key={item} item={item}>
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))
            )}
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}
