import { JsonTreeView } from '@ark-ui/solid/json-tree-view'
import { ChevronRightIcon } from 'lucide-solid'

const data = {
  regex: /^[a-z0-9]+/g,
  case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
}

export const Regex = () => {
  return (
    <JsonTreeView.Root data={data}>
      <JsonTreeView.Tree arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
