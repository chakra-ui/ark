<script setup lang="ts">
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/vue/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => ({
  title: `Item ${index + 1}`,
  lines: Array.from({ length: (index % 4) + 1 }, (_, line) => `Line ${line + 1} of item ${index + 1}`),
}))

const virtualizer = useListVirtualizer({
  count: items.length,
  estimatedSize: () => 64,
})
</script>

<template>
  <ListVirtualizer.Root :value="virtualizer" :class="styles.Root">
    <ListVirtualizer.Content>
      <ListVirtualizer.Item
        v-for="item in virtualizer.getVirtualItems()"
        :key="item.key"
        :item="item"
        measure
        :class="[styles.ItemDynamic, item.index % 2 ? styles.ItemAlt : '']"
      >
        <strong>{{ items[item.index].title }}</strong>
        <p v-for="line in items[item.index].lines" :key="line">{{ line }}</p>
      </ListVirtualizer.Item>
    </ListVirtualizer.Content>
  </ListVirtualizer.Root>
</template>
