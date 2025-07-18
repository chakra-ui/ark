import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'

export const Basic = () => {
  return (
    <JsonTreeView.Root
      data={{
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
        tags: ['tag1', 'tag2', 'tag3'],
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
      }}
    >
      <JsonTreeView.Tree arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
