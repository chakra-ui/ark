<script lang="ts">
  import { Progress, useProgress } from '@ark-ui/svelte/progress'
  import button from 'styles/button.module.css'
  import styles from 'styles/progress.module.css'

  const id = $props.id()
  const progress = useProgress({ id })
</script>

<div class="stack">
  <button class={button.Root} onclick={() => progress().setToMax()}>Set to Max</button>
  <Progress.RootProvider class={styles.Root} value={progress}>
    <Progress.Label class={styles.Label}>Label</Progress.Label>
    <Progress.ValueText class={styles.ValueText} />
    <Progress.Track class={styles.Track}>
      <Progress.Range class={styles.Range} />
    </Progress.Track>
  </Progress.RootProvider>
</div>
