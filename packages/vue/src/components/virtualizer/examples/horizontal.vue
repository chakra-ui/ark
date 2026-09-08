<script setup lang="ts">
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/vue/virtualizer'
import styles from 'styles/virtualizer.module.css'
import { computed } from 'vue'

const items = Array.from({ length: 10000 }, (_, index) => `${index + 1}`)

const virtualizer = useListVirtualizer(
  computed(() => ({
    count: items.length,
    orientation: 'horizontal',
    estimatedSize: () => 80,
  })),
)
</script>

<template>
  <ListVirtualizer.Root :value="virtualizer" :class="styles.RootHorizontal">
    <ListVirtualizer.Content>
      <ListVirtualizer.Item
        v-for="item in virtualizer.getVirtualItems()"
        :key="item.key"
        :item="item"
        :class="[styles.ItemHorizontal, item.index % 2 ? styles.ItemAlt : '']"
      >
        {{ items[item.index] }}
      </ListVirtualizer.Item>
    </ListVirtualizer.Content>
  </ListVirtualizer.Root>
</template>
