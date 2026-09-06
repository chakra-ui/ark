<script setup lang="ts">
import { Select, createListCollection } from '@ark-ui/vue/select'
import { useListVirtualizer } from '@ark-ui/vue/virtualizer'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import styles from 'styles/select.module.css'
import { computed } from 'vue'

const collection = createListCollection({
  items: Array.from({ length: 5000 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })),
})

const virtualizer = useListVirtualizer(
  computed(() => ({
    count: collection.size,
    estimatedSize: () => 36,
    overscan: 10,
    observeScrollElementSize: true,
  })),
)
</script>

<template>
  <Select.Root
    :class="styles.Root"
    :collection="collection"
    :scroll-to-index-fn="(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })"
  >
    <Select.Label :class="styles.Label">Item</Select.Label>
    <Select.Control :class="styles.Control">
      <Select.Trigger :class="styles.Trigger">
        <Select.ValueText :class="styles.ValueText" placeholder="Select an item" />
      </Select.Trigger>
      <div :class="styles.Indicators">
        <Select.Indicator :class="styles.Indicator">
          <ChevronsUpDownIcon />
        </Select.Indicator>
      </div>
    </Select.Control>
    <Teleport to="body">
      <Select.Positioner>
        <Select.Content :class="styles.Content">
          <Select.List
            :ref="virtualizer.ref"
            :class="styles.Scroller"
            :style="{ ...virtualizer.getContainerStyle(), '--total-size': `${virtualizer.getTotalSize()}px` }"
            @scroll="virtualizer.handleScroll"
          >
            <div :style="virtualizer.getContentStyle()">
              <Select.Item
                v-for="virtualItem in virtualizer.getVirtualItems()"
                :key="virtualItem.key as PropertyKey"
                :item="collection.items[virtualItem.index]"
                :class="styles.Item"
                :style="virtualizer.getItemStyle(virtualItem)"
                :aria-setsize="collection.size"
                :aria-posinset="virtualItem.index + 1"
              >
                <Select.ItemText :class="styles.ItemText">
                  {{ collection.items[virtualItem.index].label }}
                </Select.ItemText>
                <Select.ItemIndicator :class="styles.ItemIndicator">✓</Select.ItemIndicator>
              </Select.Item>
            </div>
          </Select.List>
        </Select.Content>
      </Select.Positioner>
    </Teleport>
  </Select.Root>
</template>
