'use client'
import { createCascadeCollection } from '@ark-ui/react/cascade-select'
import { CascadeSelect } from '~/components/ui/cascade-select'

interface Node {
  label: string
  value: string
  children?: Node[]
}

const collection = createCascadeCollection<Node>({
  nodeToValue: (node) => node.value,
  nodeToString: (node) => node.label,
  rootNode: {
    label: 'Root',
    value: 'root',
    children: [
      {
        label: 'Americas',
        value: 'americas',
        children: [
          {
            label: 'United States',
            value: 'us',
            children: [
              { label: 'New York', value: 'new-york' },
              { label: 'California', value: 'california' },
            ],
          },
          {
            label: 'Canada',
            value: 'canada',
            children: [
              { label: 'Ontario', value: 'ontario' },
              { label: 'Quebec', value: 'quebec' },
            ],
          },
        ],
      },
      {
        label: 'Europe',
        value: 'europe',
        children: [
          {
            label: 'France',
            value: 'france',
            children: [
              { label: 'Paris', value: 'paris' },
              { label: 'Lyon', value: 'lyon' },
            ],
          },
          {
            label: 'Germany',
            value: 'germany',
            children: [
              { label: 'Berlin', value: 'berlin' },
              { label: 'Munich', value: 'munich' },
            ],
          },
        ],
      },
    ],
  },
})

export const Demo = () => {
  return <CascadeSelect collection={collection} label="Location" placeholder="Select a location" width="2xs" />
}
