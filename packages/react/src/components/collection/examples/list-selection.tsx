import { createListCollection, useListSelection } from '@ark-ui/react/collection'

export const ListSelection = () => {
  const collection = createListCollection({
    items: ['React', 'Vue', 'Angular'],
  })

  const selection = useListSelection({
    collection,
  })

  return (
    <div>
      <pre>{JSON.stringify(selection.selectedValues)}</pre>
      {collection.items.map((item) => (
        <label
          key={item}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            userSelect: 'none',
            backgroundColor: selection.isSelected(item) ? 'lightblue' : 'white',
          }}
        >
          <input type="checkbox" checked={selection.isSelected(item)} onChange={() => selection.select(item)} />
          <span>{item}</span>
        </label>
      ))}
    </div>
  )
}
