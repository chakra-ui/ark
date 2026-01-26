import { Editable, useEditable } from '@ark-ui/react/editable'
import { PencilIcon } from 'lucide-react'
import styles from 'styles/editable.module.css'

export const RootProvider = () => {
  const editable = useEditable({ defaultValue: 'Hello World' })

  return (
    <Editable.RootProvider className={styles.Root} value={editable}>
      <Editable.Label className={styles.Label}>Label</Editable.Label>
      <Editable.Area className={styles.Area}>
        <Editable.Input className={styles.Input} />
        <Editable.Preview className={styles.Preview} />
      </Editable.Area>
      <Editable.Control className={styles.Control}>
        <Editable.EditTrigger className={styles.EditTrigger}>
          <PencilIcon />
        </Editable.EditTrigger>
      </Editable.Control>
    </Editable.RootProvider>
  )
}
