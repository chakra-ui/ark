import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'
import styles from 'styles/json-tree-view.module.css'

const data = [
  function sum(a: number, b: number) {
    return a + b
  },
  async (promises: Promise<any>[]) => await Promise.all(promises),
  function* generator(a: number) {
    while (a > 0) {
      yield a - 1
    }
  },
]

export const Functions = () => {
  return (
    <JsonTreeView.Root defaultExpandedDepth={1} className={styles.Root} data={data}>
      <JsonTreeView.Tree className={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
