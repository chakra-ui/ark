import { JsonTreeView } from '@ark-ui/solid/json-tree-view'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/json-tree-view.module.css'

const data = new Error('Error')

export const Errors = () => {
  return (
    <JsonTreeView.Root class={styles.Root} data={data} defaultExpandedDepth={1}>
      <JsonTreeView.Tree class={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
