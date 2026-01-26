<script lang="ts">
  import { Progress } from '$lib/components/progress'
  import styles from 'styles/progress.module.css'
  import button from 'styles/button.module.css'

  let value = $state<number | null>(42)
</script>

<div class="stack">
  <button class={button.Root} onclick={() => (value = 50)}>Set to 50</button>
  <Progress.Root class={styles.Root} bind:value>
    <Progress.Label class={styles.Label}>Label</Progress.Label>
    <Progress.ValueText class={styles.ValueText} />
    <Progress.Track class={styles.Track}>
      <Progress.Range class={styles.Range} />
    </Progress.Track>
  </Progress.Root>
</div>
