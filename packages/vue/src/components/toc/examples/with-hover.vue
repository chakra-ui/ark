<script setup lang="ts">
import { ref } from 'vue'
import { Toc } from '@ark-ui/vue/toc'
import { Swap } from '@ark-ui/vue/swap'
import { Pin, PinOff } from 'lucide-vue-next'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

const pinned = ref(false)
const hovered = ref(false)

const contentEl = ref()
const getScrollEl = () => contentEl.value?.$el

const getSkeletonWidth = (label: string) => `${Math.min(Math.max(label.length * 3, 16), 48)}px`
</script>

<template>
  <Toc.Root
    :class="`${styles.Root} ${styles.HoverRoot}`"
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
    <Toc.Nav
      :class="styles.NavHover"
      :data-expanded="hovered || pinned || undefined"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @click="
        () => {
          if (!hovered && !pinned) pinned = true
        }
      "
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
