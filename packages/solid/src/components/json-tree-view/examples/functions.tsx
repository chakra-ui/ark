import { JsonTreeView } from '@ark-ui/solid/json-tree-view'
import { ChevronRightIcon } from 'lucide-solid'
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
    <JsonTreeView.Root defaultExpandedDepth={1} class={styles.Root} data={data}>
      <JsonTreeView.Tree class={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
