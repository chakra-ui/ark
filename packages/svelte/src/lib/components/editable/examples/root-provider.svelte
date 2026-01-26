<script lang="ts">
  import { Editable, useEditable } from '@ark-ui/svelte/editable'
  import PencilIcon from 'lucide-svelte/icons/pencil'
  import styles from 'styles/editable.module.css'

  const editable = useEditable({ defaultValue: 'Hello World' })
</script>

<Editable.RootProvider class={styles.Root} value={editable}>
  <Editable.Label class={styles.Label}>Label</Editable.Label>
  <Editable.Area class={styles.Area}>
    <Editable.Input class={styles.Input} />
    <Editable.Preview class={styles.Preview} />
  </Editable.Area>
  <Editable.Control class={styles.Control}>
    <Editable.EditTrigger class={styles.EditTrigger}>
      <PencilIcon />
    </Editable.EditTrigger>
  </Editable.Control>
</Editable.RootProvider>
