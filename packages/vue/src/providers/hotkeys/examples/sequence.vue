<script setup lang="ts">
import { useHotkeys } from '@ark-ui/vue/hotkeys'
import { ref } from 'vue'
import styles from 'styles/hotkeys.module.css'

const routes = [
  { id: 'home', hotkey: 'G > H', keys: ['G', 'H'], label: 'Home' },
  { id: 'settings', hotkey: 'G > S', keys: ['G', 'S'], label: 'Settings' },
]

const page = ref('home')

useHotkeys(
  routes.map((route) => ({
    id: route.id,
    hotkey: route.hotkey,
    action: () => {
      page.value = route.id
    },
  })),
)
</script>

<template>
  <div :class="styles.Panel">
    <p :class="styles.Hint">Press the keys in order, one after the other</p>
    <ul :class="styles.List">
      <li v-for="route in routes" :key="route.id" :class="styles.Row" :data-fired="route.id === page ? '' : undefined">
        <span>{{ route.label }}</span>
        <span :class="styles.KeyStrip">
          <kbd
            v-for="(key, index) in route.keys"
            :key="key"
            :class="styles.Kbd"
            :data-active="route.id === page ? '' : undefined"
          >
            {{ index > 0 ? `then ${key}` : key }}
          </kbd>
        </span>
      </li>
    </ul>
    <div :class="styles.Metric">
      <span :class="styles.MetricLabel">Current page</span>
      <span :class="styles.Badge" data-state="active">{{ page }}</span>
    </div>
  </div>
</template>
