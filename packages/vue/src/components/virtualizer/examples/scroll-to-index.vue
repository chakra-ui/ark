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
  <div>
    <div :class="styles.Controls">
      <button type="button" :class="styles.Trigger" @click="virtualizer.scrollToIndex(0)">Scroll to top</button>
      <button
        type="button"
        :class="styles.Trigger"
        @click="virtualizer.scrollToIndex(Math.floor(items.length / 2), { align: 'center' })"
      >
        Scroll to middle
      </button>
      <button type="button" :class="styles.Trigger" @click="virtualizer.scrollToIndex(items.length - 1)">
        Scroll to bottom
      </button>
    </div>
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
  </div>
</template>
