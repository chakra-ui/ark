<script lang="ts">
  import { useFormatHotkey, useHotkey } from '$lib/providers/hotkeys/index.ts'
  import styles from 'styles/hotkeys.module.css'

  let count = $state(0)
  const formatHotkey = useFormatHotkey()

  useHotkey({
    hotkey: 'mod+K',
    action: () => {
      count += 1
    },
  })
</script>

<div class={styles.Panel}>
  <p class={styles.Hint}>
    Press <kbd class={styles.Kbd}>{formatHotkey('mod+K')}</kbd>
    anywhere on this page
  </p>
  <div class={styles.Metric}>
    <span class={styles.MetricValue}>{count}</span>
    <span class={styles.MetricLabel}>{count === 1 ? 'time' : 'times'}</span>
  </div>
</div>
