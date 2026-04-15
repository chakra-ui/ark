<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'executive-summary', depth: 2, label: 'Executive Summary' },
  { value: 'methodology', depth: 2, label: 'Methodology' },
  { value: 'findings', depth: 2, label: 'Findings' },
  { value: 'recommendations', depth: 2, label: 'Recommendations' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]
const paragraphs = loremIpsum({ count: 7, units: 'paragraphs' })
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
      <Toc.Title :class="styles.Title">Contents</Toc.Title>
      <Toc.List :class="styles.List">
        <Toc.Item v-for="(item, index) in items" :key="item.value" :class="styles.Item" :item="item">
          <Toc.Link :class="styles.LinkNumbered">
            <span :class="styles.Number">{{ String(index + 1).padStart(2, '0') }}</span>
            {{ item.label }}
          </Toc.Link>
        </Toc.Item>
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
</template>
