<script lang="ts">
  import { Meter } from '@ark-ui/svelte/meter'
  import styles from 'styles/meter.module.css'
</script>

<Meter.Root class={styles.Root} defaultValue={18} min={-10} max={40} formatOptions={{ style: 'unit', unit: 'celsius' }}>
  <Meter.Label class={styles.Label}>Temperature</Meter.Label>
  <Meter.ValueText class={styles.ValueText} />
  <Meter.Track class={styles.Track}>
    <Meter.Indicator class={styles.Indicator} />
  </Meter.Track>
</Meter.Root>
