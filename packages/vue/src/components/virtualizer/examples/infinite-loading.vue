<script setup lang="ts">
import { useAsyncList } from '@ark-ui/vue/collection'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/vue/virtualizer'
import styles from 'styles/virtualizer.module.css'
import { computed } from 'vue'

const PAGE_SIZE = 50
const TOTAL = 500

const loadPage = async ({ cursor }: { cursor?: string }) => {
  const start = Number(cursor ?? 0)
  await new Promise((resolve) => setTimeout(resolve, 600))
  const items = Array.from({ length: Math.min(PAGE_SIZE, TOTAL - start) }, (_, index) => `Item ${start + index + 1}`)
  const next = start + items.length
  return { items, cursor: next < TOTAL ? String(next) : undefined }
}

const list = useAsyncList<string>({ autoReload: true, load: loadPage })

const virtualizer = useListVirtualizer(
  computed(() => ({
    count: list.value.items.length,
    estimatedSize: () => 48,
    onRangeChange: ({ range }: { range: { endIndex: number } }) => {
      const current = list.value
      if (range.endIndex >= current.items.length - 10 && current.cursor !== undefined && !current.isLoading) {
        current.loadMore()
      }
    },
  })),
)
</script>

<template>
  <div class="stack">
    <ListVirtualizer.Root :value="virtualizer" :class="styles.Root">
      <ListVirtualizer.Content>
        <ListVirtualizer.Item
          v-for="item in virtualizer.getVirtualItems()"
          :key="item.key"
          :item="item"
          :class="[styles.Item, item.index % 2 ? styles.ItemAlt : '']"
        >
          {{ list.items[item.index] }}
        </ListVirtualizer.Item>
      </ListVirtualizer.Content>
    </ListVirtualizer.Root>
    <output :class="styles.Meta">
      {{ list.isLoading ? 'Loading more…' : `${list.items.length} of ${TOTAL} loaded` }}
    </output>
  </div>
</template>
