<script setup lang="ts">
import { Listbox, createListCollection } from '@ark-ui/vue/listbox'
import { useListVirtualizer } from '@ark-ui/vue/virtualizer'
import { CheckIcon } from 'lucide-vue-next'
import styles from 'styles/listbox.module.css'
import { computed } from 'vue'

const collection = createListCollection({
  items: Array.from({ length: 10000 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })),
})

const virtualizer = useListVirtualizer(
  computed(() => ({
    count: collection.size,
    estimatedSize: () => 32,
    overscan: 10,
  })),
)
</script>

<template>
  <Listbox.Root
    :class="styles.Root"
    :collection="collection"
    :scroll-to-index-fn="(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })"
  >
    <Listbox.Label :class="styles.Label">Items</Listbox.Label>
    <Listbox.Content :class="styles.Content">
      <Listbox.List
        :ref="virtualizer.ref"
        :class="styles.Scroller"
        :style="{ ...virtualizer.getContainerStyle(), '--total-size': `${virtualizer.getTotalSize()}px` }"
        @scroll="virtualizer.handleScroll"
      >
        <div :style="virtualizer.getContentStyle()">
          <Listbox.Item
            v-for="virtualItem in virtualizer.getVirtualItems()"
            :key="virtualItem.key as PropertyKey"
            :item="collection.items[virtualItem.index]"
            :class="styles.Item"
            :style="virtualizer.getItemStyle(virtualItem)"
            :aria-setsize="collection.size"
            :aria-posinset="virtualItem.index + 1"
          >
            <Listbox.ItemText :class="styles.ItemText">
              {{ collection.items[virtualItem.index].label }}
            </Listbox.ItemText>
            <Listbox.ItemIndicator :class="styles.ItemIndicator">
              <CheckIcon />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        </div>
      </Listbox.List>
    </Listbox.Content>
  </Listbox.Root>
</template>
