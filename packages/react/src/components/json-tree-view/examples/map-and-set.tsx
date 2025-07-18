import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'

const data = new Map<string, any>([
  ['name', 'ark-ui-json-tree'],
  ['license', 'MIT'],
  ['elements', new Set(['ark-ui', 123, false, true, null, undefined, 456n])],
  [
    'nested',
    new Map<string, any>([
      [
        'taglines',
        new Set([
          { name: 'ark-ui', feature: 'headless components' },
          { name: 'ark-ui', feature: 'framework agnostic' },
          { name: 'ark-ui', feature: 'accessible by default' },
        ]),
      ],
    ]),
  ],
])

export const MapAndSet = () => {
  return (
    <JsonTreeView.Root data={data}>
      <JsonTreeView.Tree arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
