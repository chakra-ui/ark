<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
  import styles from 'styles/editable.module.css'
</script>

<Editable.Root class={styles.Root} defaultValue="Double-click to edit" activationMode="dblclick">
  <Editable.Label class={styles.Label}>Label</Editable.Label>
  <Editable.Area class={styles.Area}>
    <Editable.Input class={styles.Input} />
    <Editable.Preview class={styles.Preview} />
  </Editable.Area>
</Editable.Root>
