import { For, createSignal } from 'solid-js'
import { Marquee } from '@ark-ui/solid/marquee'
import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
  { name: 'Grape', logo: '🍇' },
  { name: 'Watermelon', logo: '🍉' },
  { name: 'Strawberry', logo: '🍓' },
]

export const FiniteLoops = () => {
  const [loopCount, setLoopCount] = createSignal(0)
  const [completedCount, setCompletedCount] = createSignal(0)

  return (
    <div class="stack">
      <Marquee.Root
        loopCount={3}
        onLoopComplete={() => setLoopCount((prev) => prev + 1)}
        onComplete={() => setCompletedCount((prev) => prev + 1)}
        class={styles.Root}
      >
        <Marquee.Viewport class={styles.Viewport}>
          <Marquee.Content class={styles.Content}>
            <For each={items}>
              {(item) => (
                <Marquee.Item class={styles.Item}>
                  <span class={styles.ItemLogo}>{item.logo}</span>
                  <span class={styles.ItemName}>{item.name}</span>
                </Marquee.Item>
              )}
            </For>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <div>
        <p>Loop completed: {loopCount()} times</p>
        <p>Animation completed: {completedCount()} times</p>
      </div>
    </div>
  )
}
