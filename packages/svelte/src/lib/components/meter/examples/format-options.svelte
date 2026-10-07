<script lang="ts">
  import { Meter } from '@ark-ui/svelte/meter'
  import styles from 'styles/meter.module.css'
</script>

<Meter.Root
  class={styles.Root}
  defaultValue={1240}
  max={2000}
  formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
>
  <Meter.Label class={styles.Label}>Monthly budget</Meter.Label>
  <Meter.ValueText class={styles.ValueText} />
  <Meter.Track class={styles.Track}>
    <Meter.Indicator class={styles.Indicator} />
  </Meter.Track>
</Meter.Root>
