import { JsonTreeView } from '@ark-ui/solid/json-tree-view'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/json-tree-view.module.css'

const data = {
  regex: /^[a-z0-9]+/g,
  case_insensitive: /^(?:[a-z0-9]+)foo.*?/i,
}

export const Regex = () => {
  return (
    <JsonTreeView.Root defaultExpandedDepth={1} class={styles.Root} data={data}>
      <JsonTreeView.Tree class={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
