<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import { ref } from 'vue'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

const contentEl = ref()
const getScrollEl = () => contentEl.value?.$el
</script>

<template>
  <Toc.Root :class="styles.Root" :items="items" :getScrollEl="getScrollEl">
    <Toc.Content :class="styles.Content" ref="contentEl">
      <section v-for="item in items" :key="item.value">
        <h2 :id="item.value">{{ item.label }}</h2>
        <div :class="styles.DummyText">
          <div v-for="i in item.lines" :key="i" :class="styles.DummyLine" />
        </div>
      </section>
    </Toc.Content>
    <Toc.Nav :class="styles.Nav">
      <Toc.Title :class="styles.Title">On this page</Toc.Title>
      <Toc.List :class="styles.List">
        <Toc.Indicator :class="styles.Indicator" />
        <Toc.Item v-for="item in items" :key="item.value" :class="styles.Item" :item="item">
          <Toc.Link :class="styles.Link" :href="`#${item.value}`">{{ item.label }}</Toc.Link>
        </Toc.Item>
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
</template>
