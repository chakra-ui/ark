import { useHotkeys } from '@ark-ui/react/hotkeys'
import { useState } from 'react'
import styles from 'styles/hotkeys.module.css'

const routes = [
  { id: 'home', hotkey: 'G > H', keys: ['G', 'H'], label: 'Home' },
  { id: 'settings', hotkey: 'G > S', keys: ['G', 'S'], label: 'Settings' },
]

export const Sequence = () => {
  const [page, setPage] = useState('home')

  useHotkeys(routes.map((route) => ({ id: route.id, hotkey: route.hotkey, action: () => setPage(route.id) })))

  return (
    <div className={styles.Panel}>
      <p className={styles.Hint}>Press the keys in order, one after the other</p>
      <ul className={styles.List}>
        {routes.map((route) => (
          <li className={styles.Row} key={route.id} data-fired={route.id === page ? '' : undefined}>
            <span>{route.label}</span>
            <span className={styles.KeyStrip}>
              {route.keys.map((key, index) => (
                <kbd className={styles.Kbd} key={key} data-active={route.id === page ? '' : undefined}>
                  {index > 0 ? `then ${key}` : key}
                </kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.Metric}>
        <span className={styles.MetricLabel}>Current page</span>
        <span className={styles.Badge} data-state="active">
          {page}
        </span>
      </div>
    </div>
  )
}
