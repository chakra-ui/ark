import { Meter } from '@ark-ui/solid/meter'
import { For, createSignal, onCleanup } from 'solid-js'
import styles from 'styles/meter.module.css'

const channels = ['L', 'R', 'C', 'Sub']

const sample = () => channels.map(() => Math.round(20 + Math.random() * 80))

export const Vertical = () => {
  const [levels, setLevels] = createSignal(channels.map(() => 50))

  const id = setInterval(() => setLevels(sample()), 600)
  onCleanup(() => clearInterval(id))

  return (
    <div class={styles.Levels}>
      <For each={channels}>
        {(channel, index) => (
          <Meter.Root
            class={`${styles.Root} ${styles.Graded}`}
            orientation="vertical"
            value={levels()[index()]}
            low={60}
            high={85}
            optimum={30}
          >
            <Meter.Track class={styles.Track}>
              <Meter.Indicator class={styles.Indicator} />
            </Meter.Track>
            <Meter.Label class={styles.Label}>{channel}</Meter.Label>
          </Meter.Root>
        )}
      </For>
    </div>
  )
}
