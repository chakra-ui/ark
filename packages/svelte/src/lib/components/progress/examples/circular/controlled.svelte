<script lang="ts">
  import { Progress } from '@ark-ui/svelte/progress'
  import styles from 'styles/progress-circular.module.css'
  import button from 'styles/button.module.css'

  let value = $state<number | null>(42)
</script>

<div class="stack">
  <button class={button.Root} onclick={() => (value = 100)}>Set to 100</button>
  <Progress.Root class={styles.Root} bind:value>
    <div class={styles.CircleContainer}>
      <Progress.Circle class={styles.Circle}>
        <Progress.CircleTrack class={styles.CircleTrack} />
        <Progress.CircleRange class={styles.CircleRange} />
      </Progress.Circle>
      <Progress.ValueText class={styles.ValueText} />
    </div>
  </Progress.Root>
</div>
