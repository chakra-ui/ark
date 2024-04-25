<script lang="ts">
import type { ItemProps } from '@zag-js/tags-input'
import type { PolimoprhicProps } from '../factory'

export interface TagsInputItemProps extends PolimoprhicProps, ItemProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { TagsInputItemProvider } from './use-tags-input-item-context'
import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context'

const props = defineProps<TagsInputItemProps>()
const tagsInput = useTagsInputContext()

TagsInputItemPropsProvider(props)
TagsInputItemProvider(computed(() => tagsInput.value.getItemState(props)))
</script>

<template>
  <ark.div v-bind="tagsInput.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
