import { NumberFlow } from '@ark-ui/solid/number-flow'
import { createSignal, onCleanup } from 'solid-js'
import styles from 'styles/number-flow.module.css'

export const PrefixSuffix = () => {
  const [throughput, setThroughput] = createSignal(1280)
  const [latency, setLatency] = createSignal(42)

  const id = setInterval(() => {
    setThroughput(Math.round(900 + Math.random() * 900))
    setLatency(Math.round(20 + Math.random() * 60))
  }, 2000)
  onCleanup(() => clearInterval(id))

  return (
    <div class={styles.Grid}>
      <div class={styles.Stat}>
        <span class={styles.Label}>Throughput</span>
        <NumberFlow.Root value={throughput()} prefix="~" suffix=" req/s" class={styles.Root}>
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
      <div class={styles.Stat}>
        <span class={styles.Label}>p95 latency</span>
        <NumberFlow.Root value={latency()} suffix=" ms" class={styles.Root}>
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
    </div>
  )
}
