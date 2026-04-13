<script setup lang="ts">
import { computed } from 'vue'
import { Collapsible } from '@ark-ui/vue/collapsible'
import { Toc } from '@ark-ui/vue/toc'
import { ChevronRight } from 'lucide-vue-next'
import styles from 'styles/toc.module.css'
import collapsibleStyles from 'styles/Collapsible.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 7, units: 'paragraphs' })

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

const RADIUS = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const getActiveIndex = (activeItems: any[]) => {
  if (!activeItems || activeItems.length === 0) return -1
  return items.findIndex((i) => i.value === activeItems[0]?.value)
}

const getActiveLabel = (activeItems: any[]) => {
  const idx = getActiveIndex(activeItems)
  return idx >= 0 ? items[idx].label : undefined
}

const getProgress = (activeItems: any[]) => {
  const idx = getActiveIndex(activeItems)
  return idx >= 0 ? (idx + 1) / items.length : 0
}

const getDashArray = (activeItems: any[]) => {
  const progress = getProgress(activeItems)
  return `${progress * CIRCUMFERENCE} ${CIRCUMFERENCE}`
}
</script>

<template>
  <Toc.Root :class="`${styles.Root} ${styles.RootStacked}`" :items="items">
    <Toc.Content :class="styles.Content">
      <section v-for="item in items" :key="item.value">
        <h2 :id="item.value">{{ item.label }}</h2>
        <p>{{ p }}</p>
      </section>
    </Toc.Content>

    <Toc.Nav :class="styles.Nav">
      <Toc.Context v-slot="{ activeItems: contextActiveItems }">
        <Collapsible.Root :class="collapsibleStyles.Root" style="width: 100%">
          <Collapsible.Trigger :class="collapsibleStyles.Trigger">
            <span :class="styles.TriggerContent">
              <span :class="styles.ProgressRing">
                <svg width="28" height="28" viewBox="0 0 36 36" aria-hidden="true">
                  <circle
                    cx="18"
                    cy="18"
                    :r="RADIUS"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    :r="RADIUS"
                    fill="none"
                    stroke="var(--demo-coral-solid)"
                    strokeWidth="2.5"
                    :strokeDasharray="getDashArray(contextActiveItems)"
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                    style="transition: stroke-dasharray 0.4s ease-out"
                  />
                  <text
                    x="18"
                    y="18"
                    text-anchor="middle"
                    dominant-baseline="central"
                    font-size="10"
                    font-weight="600"
                    fill="currentColor"
                    :class="styles.ProgressIndexText"
                  >
                    {{ getActiveIndex(contextActiveItems) >= 0 ? getActiveIndex(contextActiveItems) + 1 : '—' }}
                  </text>
                </svg>
              </span>
              <span :class="styles.TriggerLabel">
                {{ getActiveLabel(contextActiveItems) ?? 'On this page' }}
              </span>
            </span>
            <Collapsible.Indicator :class="collapsibleStyles.Indicator">
              <ChevronRight />
            </Collapsible.Indicator>
          </Collapsible.Trigger>
          <Collapsible.Content :class="collapsibleStyles.Content">
            <Toc.List :class="styles.List">
              <Toc.Item v-for="(item, index) in items" :key="item.value" :item="item" :class="styles.Item">
                <Toc.Link :class="styles.LinkNumbered" :href="`#${item.value}`">
                  <span :class="styles.Number">{{ String(index + 1).padStart(2, '0') }}</span>
                  {{ item.label }}
                </Toc.Link>
              </Toc.Item>
            </Toc.List>
          </Collapsible.Content>
        </Collapsible.Root>
      </Toc.Context>
    </Toc.Nav>
  </Toc.Root>
</template>
