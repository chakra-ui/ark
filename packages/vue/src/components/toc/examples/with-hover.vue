<script setup lang="ts">
import { ref, computed } from 'vue'
import { Toc } from '@ark-ui/vue/toc'
import { Swap } from '@ark-ui/vue/swap'
import { Pin, PinOff } from 'lucide-vue-next'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'getting-started', depth: 2, label: 'Getting Started' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'api', depth: 2, label: 'API' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

const paragraph = loremIpsum({ count: 7, units: 'paragraphs' })
const pinned = ref(false)
const hovered = ref(false)

const getSkeletonWidth = (label: string) => {
  const width = Math.min(Math.max(label.length * 3, 16), 48)
  return `${width}px`
}
</script>

<template>
  <Toc.Root :class="`${styles.Root} ${styles.HoverRoot}`" :items="items">
    <article :class="styles.Content">
      <section v-for="item in items" :key="item.value">
        <h2 :id="item.value">{{ item.label }}</h2>
        <p>{{ paragraph }}</p>
      </section>
    </article>
    <Toc.Nav
      :class="styles.NavHover"
      :data-expanded="hovered || pinned || undefined"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <button
        type="button"
        :class="styles.PinButton"
        :aria-label="pinned ? 'Unpin navigation' : 'Pin navigation'"
        @click="pinned = !pinned"
      >
        <Swap.Root :swap="pinned">
          <Swap.Indicator type="on">
            <PinOff :size="12" />
          </Swap.Indicator>
          <Swap.Indicator type="off">
            <Pin :size="12" />
          </Swap.Indicator>
        </Swap.Root>
      </button>

      <Swap.Root :class="styles.HoverSwap" :swap="hovered || pinned">
        <Swap.Indicator type="off">
          <div :class="styles.HoverSkeletons">
            <span
              v-for="item in items"
              :key="item.value"
              :class="styles.SkeletonBar"
              :style="{ width: getSkeletonWidth(item.label) }"
            />
          </div>
        </Swap.Indicator>
        <Swap.Indicator type="on">
          <div>
            <Toc.List :class="styles.HoverList">
              <Toc.Item v-for="item in items" :key="item.value" :item="item" :class="styles.Item">
                <Toc.Link :class="styles.HoverLink" :href="`#${item.value}`">
                  {{ item.label }}
                </Toc.Link>
              </Toc.Item>
            </Toc.List>
          </div>
        </Swap.Indicator>
      </Swap.Root>
    </Toc.Nav>
  </Toc.Root>
</template>
