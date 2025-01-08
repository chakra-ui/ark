<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputItemPreviewBaseProps extends PolymorphicProps {}
export interface TagsInputItemPreviewProps
  extends TagsInputItemPreviewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

defineProps<TagsInputItemPreviewProps>()

const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tagsInput.getItemPreviewProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
