<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTagsInputContext } from './use-tags-input-context'

export interface TagsInputContextProps
  extends SlotsType<{
    default: UnwrapRef<UseTagsInputContext>
  }> {}
</script>

<script setup lang="ts">
import { useTagsInputContext } from './use-tags-input-context'

const tagsInput = useTagsInputContext()

defineSlots<{
  default(tagsInput: UnwrapRef<UseTagsInputContext>): unknown
}>()
</script>

<template>
  <slot v-bind="tagsInput"></slot>
</template>
