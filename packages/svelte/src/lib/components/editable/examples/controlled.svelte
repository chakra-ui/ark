<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
  import PencilIcon from 'lucide-svelte/icons/pencil'
  import styles from 'styles/editable.module.css'

  let value = $state('Hello World')
</script>

<Editable.Root class={styles.Root} placeholder="Enter text..." {value} onValueChange={(e) => (value = e.value)}>
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
</Editable.Root>
