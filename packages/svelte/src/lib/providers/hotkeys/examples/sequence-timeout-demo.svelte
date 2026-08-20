<script lang="ts">
  import { useHotkey } from '$lib/providers/hotkeys/index.ts'
  import styles from 'styles/hotkeys.module.css'

  const TIMEOUT_MS = 600
  let completed = $state(0)

  useHotkey('G > H', () => {
    completed += 1
  })
</script>

<div class={styles.Panel}>
  <p class={styles.Hint}>
    Press <kbd class={styles.Kbd}>G</kbd>
    then
    <kbd class={styles.Kbd}>H</kbd>
    . The second key must land within
    {TIMEOUT_MS}ms, otherwise the sequence resets and nothing fires.
  </p>

  <div class={styles.Metric}>
    <span class={styles.MetricValue}>{completed}</span>
    <span class={styles.MetricLabel}>{completed === 1 ? 'completion' : 'completions'}</span>
  </div>

  <div class={styles.Section}>
    <span class={styles.SectionLabel}>sequenceTimeoutMs</span>
    <span class={styles.Badge}>{TIMEOUT_MS}ms</span>
  </div>
</div>
