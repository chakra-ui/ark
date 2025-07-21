import { JsonTreeView } from '@ark-ui/solid/json-tree-view'
import { ChevronRightIcon } from 'lucide-solid'

const data = new Error('Error')

export const Errors = () => {
  return (
    <JsonTreeView.Root data={data}>
      <JsonTreeView.Tree arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
