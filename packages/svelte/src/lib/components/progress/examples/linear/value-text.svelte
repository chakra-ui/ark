<script lang="ts">
  import { Progress } from '@ark-ui/svelte/progress'
  import styles from 'styles/progress.module.css'
</script>

<Progress.Root
  class={styles.Root}
  defaultValue={42}
  translations={{
    value: ({ value, max }) => (value == null ? 'Loading...' : `${value} of ${max} items loaded`),
  }}
>
  <Progress.Label class={styles.Label}>Label</Progress.Label>
  <Progress.ValueText class={styles.ValueText} />
  <Progress.Track class={styles.Track}>
    <Progress.Range class={styles.Range} />
  </Progress.Track>
</Progress.Root>
