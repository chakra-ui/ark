<script setup lang="ts">
import { Toc } from '@ark-ui/vue/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const groups = [
  {
    label: 'Getting Started',
    items: [
      { value: 'overview', depth: 2, label: 'Overview' },
      { value: 'installation', depth: 2, label: 'Installation' },
    ],
  },
  {
    label: 'Advanced',
    items: [
      { value: 'configuration', depth: 2, label: 'Configuration' },
      { value: 'plugins', depth: 2, label: 'Plugins' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { value: 'api', depth: 2, label: 'API' },
      { value: 'changelog', depth: 2, label: 'Changelog' },
    ],
  },
]

const paragraphs = loremIpsum({ count: 5, units: 'paragraphs' })
const allItems = groups.flatMap((group) => group.items)
</script>

<template>
  <Toc.Root :class="styles.Root" :items="allItems">
    <Toc.Content :class="styles.Content">
      <section v-for="group in groups" :key="group.label">
        <h2>{{ group.label }}</h2>
        <section v-for="item in group.items" :key="item.value">
          <h3 :id="item.value">{{ item.label }}</h3>
          <p>{{ paragraphs }}</p>
        </section>
      </section>
    </Toc.Content>
    <Toc.Nav :class="styles.Nav">
      <div v-for="group in groups" :key="group.label" :class="styles.Group">
        <h3>{{ group.label }}</h3>
        <Toc.List :class="styles.List">
          <Toc.Item v-for="item in group.items" :key="item.value" :class="styles.Item" :item="item">
            <Toc.Link :class="styles.Link" :href="`#${item.value}`">
              {{ item.label }}
            </Toc.Link>
          </Toc.Item>
        </Toc.List>
      </div>
    </Toc.Nav>
  </Toc.Root>
</template>
