<script lang="ts">
import type { ItemProps } from '@zag-js/tags-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputItemBaseProps extends ItemProps, PolymorphicProps {}
export interface TagsInputItemProps
  extends
    TagsInputItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { TagsInputItemProvider } from './use-tags-input-item-context.ts'
import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<TagsInputItemProps>()
const tagsInput = useTagsInputContext()

TagsInputItemPropsProvider(props)
TagsInputItemProvider(computed(() => tagsInput.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tagsInput.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
