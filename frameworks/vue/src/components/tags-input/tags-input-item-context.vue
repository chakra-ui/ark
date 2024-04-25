<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseTagsInputItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useTagsInputItemContext } from './use-tags-input-item-context'

const tagsInput = useTagsInputItemContext()

defineSlots<{
  default(tagsInput: UnwrapRef<UseTagsInputItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="tagsInput"></slot>
</template>
