<script setup lang="ts">
import { Toc, useToc } from '@ark-ui/vue/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'principles', depth: 2, label: 'Principles' },
  { value: 'patterns', depth: 2, label: 'Patterns' },
  { value: 'testing', depth: 2, label: 'Testing' },
  { value: 'performance', depth: 2, label: 'Performance' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

const paragraphs = loremIpsum({ count: 7, units: 'paragraphs' })

const toc = useToc({ items })
</script>

<template>
  <Toc.RootProvider :class="styles.Root" :value="toc">
    <Toc.Content :class="styles.Content">
      <section v-for="item in items" :key="item.value">
        <h2 :id="item.value">{{ item.label }}</h2>
        <p>{{ paragraphs }}</p>
      </section>
    </Toc.Content>
    <Toc.Nav :class="styles.Nav">
      <Toc.Title :class="styles.Title">On this page</Toc.Title>
      <p :class="styles.ActiveIds">Active: {{ toc.activeIds.length > 0 ? toc.activeIds.join(', ') : '—' }}</p>
      <Toc.List :class="styles.List">
        <Toc.Item v-for="item in items" :key="item.value" :class="styles.Item" :item="item">
          <Toc.Link :class="styles.Link">{{ item.label }}</Toc.Link>
        </Toc.Item>
      </Toc.List>
    </Toc.Nav>
  </Toc.RootProvider>
</template>
