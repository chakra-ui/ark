import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/json-tree-view.module.css'

const data = Object.assign(new Error('Could not load user'), {
  stack: 'Error: Could not load user\n    at fetchUser (api.ts:12:9)\n    at loadProfile (profile.ts:4:3)',
})

export const Errors = () => {
  return (
    <JsonTreeView.Root className={styles.Root} data={data} defaultExpandedDepth={1}>
      <JsonTreeView.Tree className={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
