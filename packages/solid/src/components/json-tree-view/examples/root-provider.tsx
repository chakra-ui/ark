import { JsonTreeView, useJsonTreeView } from '@ark-ui/solid/json-tree-view'
import { ChevronRightIcon } from 'lucide-solid'
import styles from 'styles/json-tree-view.module.css'

export const RootProvider = () => {
  const jsonTreeView = useJsonTreeView({
    defaultExpandedDepth: 1,
    data: {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      tags: ['tag1', 'tag2', 'tag3'],
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
    },
  })

  return (
    <JsonTreeView.RootProvider class={styles.Root} value={jsonTreeView}>
      <JsonTreeView.Tree class={styles.Tree} arrow={<ChevronRightIcon />} />
    </JsonTreeView.RootProvider>
  )
}
