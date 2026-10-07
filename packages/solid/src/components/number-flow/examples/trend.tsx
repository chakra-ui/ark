import { NumberFlow } from '@ark-ui/solid/number-flow'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-solid'
import { Show, createMemo, createSignal, onCleanup } from 'solid-js'
import styles from 'styles/number-flow.module.css'

const open = 182.4

export const Trend = () => {
  const [price, setPrice] = createSignal(open)

  const id = setInterval(() => {
    setPrice((prev) => Math.max(1, prev + (Math.random() - 0.48) * 3))
  }, 1600)
  onCleanup(() => clearInterval(id))

  const change = createMemo(() => (price() - open) / open)
  const direction = () => (change() >= 0 ? 'up' : 'down')

  return (
    <div class={styles.Card}>
      <div class={styles.Header}>
        <span class={styles.Label}>ARK · Nasdaq</span>
        <span class={styles.Badge} data-trend={direction()}>
          <Show when={direction() === 'up'} fallback={<TrendingDownIcon />}>
            <TrendingUpIcon />
          </Show>
          <NumberFlow.Root
            value={change()}
            formatOptions={{
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              signDisplay: 'always',
            }}
            class={styles.Root}
          >
            <NumberFlow.Segments />
            <NumberFlow.HiddenValueText />
          </NumberFlow.Root>
        </span>
      </div>
      <NumberFlow.Root
        value={price()}
        trend={true}
        formatOptions={{ style: 'currency', currency: 'USD' }}
        class={`${styles.Root} ${styles.Display} ${styles.Trend}`}
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span class={styles.Caption}>Digits roll in the direction the price moved.</span>
    </div>
  )
}
