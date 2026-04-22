<script setup lang="ts">
import { ref } from 'vue'
import { Collapsible } from '@ark-ui/vue/collapsible'
import { Toc } from '@ark-ui/vue/toc'
import { ChevronRight } from 'lucide-vue-next'
import styles from 'styles/toc.module.css'
import collapsibleStyles from 'styles/Collapsible.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

const RADIUS = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const contentEl = ref()
const getScrollEl = () => contentEl.value?.$el

const getActiveIndex = (activeItems: any[]) => {
  if (!activeItems || activeItems.length === 0) return -1
  return items.findIndex((i) => i.value === activeItems[0]?.value)
}

const getActiveLabel = (activeItems: any[]) => {
  const idx = getActiveIndex(activeItems)
  return idx >= 0 ? items[idx].label : undefined
}

const getDashArray = (activeItems: any[]) => {
  const idx = getActiveIndex(activeItems)
  const progress = idx >= 0 ? (idx + 1) / items.length : 0
  return `${progress * CIRCUMFERENCE} ${CIRCUMFERENCE}`
}
</script>

<template>
  <Toc.Root
    :class="`${styles.Root} ${styles.RootStacked}`"
    :items="items"
    rootMargin="0px 0px -80% 0px"
    :getScrollEl="getScrollEl"
  >
    <Toc.Content :class="styles.Content" ref="contentEl">
      <section v-for="item in items" :key="item.value">
        <h2 :id="item.value">{{ item.label }}</h2>
        <div :class="styles.DummyText">
          <div v-for="i in item.lines" :key="i" :class="styles.DummyLine" />
        </div>
      </section>
    </Toc.Content>

    <Toc.Nav :class="styles.Nav">
      <Toc.Context v-slot="{ activeItems: contextActiveItems }">
        <Collapsible.Root style="width: 100%">
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
                    stroke-opacity="0.2"
                    stroke-width="2.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    :r="RADIUS"
                    fill="none"
                    stroke="var(--demo-coral-solid)"
                    stroke-width="2.5"
                    :stroke-dasharray="getDashArray(contextActiveItems)"
                    stroke-linecap="round"
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
