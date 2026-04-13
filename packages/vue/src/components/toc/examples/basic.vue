<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'introduction', depth: 5, label: 'Introduction' },
  { value: 'getting-started', depth: 2, label: 'Getting Started' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'configuration', depth: 2, label: 'Configuration' },
  { value: 'migration', depth: 2, label: 'Migration' },
  { value: 'faq', depth: 2, label: 'FAQ' },
  { value: 'troubleshooting', depth: 2, label: 'Troubleshooting' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

const paragraphs = loremIpsum({ count: 6, units: 'paragraphs' })
</script>
<template>
  <Toc.Root :class="styles.Root" :items="items">
    <Toc.Content :class="styles.Content">
      <section v-for="item in items" :key="item.value">
        <h2 :id="item.value">{{ item.label }}</h2>
        <p>{{ paragraphs }}</p>
      </section>
    </Toc.Content>
    <Toc.Nav :class="styles.Nav">
      <Toc.Title :class="styles.Title">On this page</Toc.Title>
      <Toc.List :class="styles.List">
        <Toc.Item v-for="item in items" :key="item.value" :item="item" :class="styles.Item">
          <Toc.Link :class="styles.Link" :href="`#${item.value}`">{{ item.label }}</Toc.Link>
        </Toc.Item>
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
</template>
