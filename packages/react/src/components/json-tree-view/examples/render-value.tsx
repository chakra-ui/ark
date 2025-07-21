import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'

export const RenderValue = () => {
  return (
    <JsonTreeView.Root
      defaultExpandedDepth={2}
      data={{
        name: 'John Doe',
        age: 30,
        number: Number.NaN,
        email: 'john.doe@example.com',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
      }}
    >
      <JsonTreeView.Tree
        arrow={<ChevronRightIcon />}
        renderValue={(node) => {
          if (node.type === 'text' && typeof node.value === 'string' && isEmail(node.value)) {
            return (
              <a href={`mailto:${node.value}`} target="_blank" rel="noreferrer">
                {node.value}
              </a>
            )
          }
        }}
      />
    </JsonTreeView.Root>
  )
}

const isEmail = (value: string) => {
  const strippedValue = value.replace(/^"(.*)"$/, '$1')
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strippedValue)
}
