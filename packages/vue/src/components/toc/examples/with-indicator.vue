<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'overview', depth: 2, label: 'Overview' },
  { value: 'details', depth: 2, label: 'Details' },
  { value: 'examples', depth: 2, label: 'Examples' },
  { value: 'faq', depth: 2, label: 'FAQ' },
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
        <Toc.Indicator :class="styles.Indicator" />
        <Toc.Item v-for="item in items" :key="item.value" :class="styles.Item" :item="item">
          <Toc.Link :class="styles.Link">{{ item.label }}</Toc.Link>
        </Toc.Item>
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
</template>
