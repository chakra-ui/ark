import { useHotkeys } from '@ark-ui/solid/hotkeys'
import { For, createSignal } from 'solid-js'
import styles from 'styles/hotkeys.module.css'

const routes = [
  { id: '03-home', hotkey: 'G > H', keys: ['G', 'H'], label: 'Home' },
  { id: '03-settings', hotkey: 'G > S', keys: ['G', 'S'], label: 'Settings' },
]

export const Sequence = () => {
  const [page, setPage] = createSignal('home')

  useHotkeys(routes.map((route) => ({ id: route.id, hotkey: route.hotkey, action: () => setPage(route.id) })))

  return (
    <div class={styles.Panel}>
      <p class={styles.Hint}>Press the keys in order, one after the other</p>
      <ul class={styles.List}>
        <For each={routes}>
          {(route) => (
            <li class={styles.Row} data-fired={route.id === page() ? '' : undefined}>
              <span>{route.label}</span>
              <span class={styles.KeyStrip}>
                <For each={route.keys}>
                  {(key, index) => (
                    <kbd class={styles.Kbd} data-active={route.id === page() ? '' : undefined}>
                      {index() > 0 ? `then ${key}` : key}
                    </kbd>
                  )}
                </For>
              </span>
            </li>
          )}
        </For>
      </ul>
      <div class={styles.Metric}>
        <span class={styles.MetricLabel}>Current page</span>
        <span class={styles.Badge} data-state="active">
          {page()}
        </span>
      </div>
    </div>
  )
}
