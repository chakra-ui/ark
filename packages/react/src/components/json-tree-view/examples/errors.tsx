import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/json-tree-view.module.css'

const data = new Error('Error')

export const Errors = () => {
  return (
    <JsonTreeView.Root className={styles.Root} data={data} defaultExpandedDepth={1}>
      <JsonTreeView.Tree className={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
