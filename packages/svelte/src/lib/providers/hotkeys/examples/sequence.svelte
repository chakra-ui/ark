<script lang="ts">
  import { useHotkeys } from '$lib/providers/hotkeys/index.ts'
  import styles from 'styles/hotkeys.module.css'

  const routes = [
    { id: 'home', hotkey: 'G > H', keys: ['G', 'H'], label: 'Home' },
    { id: 'settings', hotkey: 'G > S', keys: ['G', 'S'], label: 'Settings' },
  ]

  let page = $state('home')

  useHotkeys(routes.map((route) => ({ id: route.id, hotkey: route.hotkey, action: () => (page = route.id) })))
</script>

<div class={styles.Panel}>
  <p class={styles.Hint}>Press the keys in order, one after the other</p>
  <ul class={styles.List}>
    {#each routes as route (route.id)}
      <li class={styles.Row} data-fired={route.id === page ? '' : undefined}>
        <span>{route.label}</span>
        <span class={styles.KeyStrip}>
          {#each route.keys as key, index (key)}
            <kbd class={styles.Kbd} data-active={route.id === page ? '' : undefined}>
              {index > 0 ? `then ${key}` : key}
            </kbd>
          {/each}
        </span>
      </li>
    {/each}
  </ul>
  <div class={styles.Metric}>
    <span class={styles.MetricLabel}>Current page</span>
    <span class={styles.Badge} data-state="active">{page}</span>
  </div>
</div>
