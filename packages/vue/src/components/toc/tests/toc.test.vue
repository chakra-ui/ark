<script setup lang="ts">
import { Toc, type TocRootProps } from '@ark-ui/vue/toc'

const props = defineProps<Pick<TocRootProps, 'items' | 'activeIds'>>()
</script>

<template>
  <Toc.Root :items="props.items" :active-ids="props.activeIds">
    <Toc.List>
      <Toc.Item v-for="item in props.items" :key="item.value" :item="item">
        <Toc.Link :href="`#${item.value}`">{{ item.value }}</Toc.Link>
      </Toc.Item>
    </Toc.List>
  </Toc.Root>
</template>
