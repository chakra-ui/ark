<script setup lang="ts">
import { WindowVirtualizer, useWindowVirtualizer } from '@ark-ui/vue/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

const virtualizer = useWindowVirtualizer({
  count: items.length,
  estimatedSize: () => 48,
})
</script>

<template>
  <WindowVirtualizer.Root :value="virtualizer" :class="styles.Window">
    <WindowVirtualizer.Content>
      <WindowVirtualizer.Item
        v-for="item in virtualizer.getVirtualItems()"
        :key="item.key"
        :item="item"
        :class="[styles.Item, item.index % 2 ? styles.ItemAlt : '']"
      >
        {{ items[item.index] }}
      </WindowVirtualizer.Item>
    </WindowVirtualizer.Content>
  </WindowVirtualizer.Root>
</template>
