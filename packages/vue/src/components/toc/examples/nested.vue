<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 10 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 12 },
  { value: 'installation', depth: 3, label: 'Installation', lines: 8 },
  { value: 'configuration', depth: 3, label: 'Configuration', lines: 14 },
  { value: 'api-reference', depth: 2, label: 'API Reference', lines: 10 },
  { value: 'hooks', depth: 3, label: 'Hooks', lines: 8 },
  { value: 'components', depth: 3, label: 'Components', lines: 12 },
  { value: 'examples', depth: 2, label: 'Examples', lines: 10 },
]

const tagMap = { 2: 'h2', 3: 'h3' } as const
</script>

<template>
  <Toc.Root :class="styles.Root" :items="items">
    <Toc.Content :class="styles.Content">
      <section v-for="item in items" :key="item.value">
        <component :is="tagMap[item.depth as 2 | 3]" :id="item.value">
          {{ item.label }}
        </component>
        <div :class="styles.DummyText">
          <div v-for="i in item.lines" :key="i" :class="styles.DummyLine" />
        </div>
      </section>
    </Toc.Content>
    <Toc.Nav :class="styles.Nav">
      <Toc.Title :class="styles.Title">On this page</Toc.Title>
      <Toc.List :class="styles.List">
        <Toc.Item
          v-for="item in items"
          :key="item.value"
          :item="item"
          :class="item.depth > 2 ? styles.ItemNested : styles.Item"
        >
          <Toc.Link :class="styles.Link" :href="`#${item.value}`">{{ item.label }}</Toc.Link>
        </Toc.Item>
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
</template>
