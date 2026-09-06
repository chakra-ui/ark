<script setup lang="ts">
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/vue/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

const virtualizer = useListVirtualizer({
  count: items.length,
  estimatedSize: () => 48,
})
</script>

<template>
  <ListVirtualizer.Root :value="virtualizer" :class="styles.Root">
    <ListVirtualizer.Content>
      <ListVirtualizer.Item
        v-for="item in virtualizer.getVirtualItems()"
        :key="item.key"
        :item="item"
        :class="[styles.Item, item.index % 2 ? styles.ItemAlt : '']"
      >
        {{ items[item.index] }}
      </ListVirtualizer.Item>
    </ListVirtualizer.Content>
  </ListVirtualizer.Root>
</template>
