<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'getting-started', depth: 2, label: 'Getting Started' },
  { value: 'installation', depth: 3, label: 'Installation' },
  { value: 'configuration', depth: 3, label: 'Configuration' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'hooks', depth: 3, label: 'Hooks' },
  { value: 'components', depth: 3, label: 'Components' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

const paragraph = loremIpsum({ count: 5, units: 'paragraphs' })
const tagMap = { 2: 'h2', 3: 'h3' } as const
</script>

<template>
  <Toc.Root :class="styles.Root" :items="items">
    <Toc.Content :class="styles.Content">
      <section v-for="item in items" :key="item.value">
        <component :is="tagMap[item.depth as 2 | 3]" :id="item.value">
          {{ item.label }}
        </component>
        <p>{{ paragraph }}</p>
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
