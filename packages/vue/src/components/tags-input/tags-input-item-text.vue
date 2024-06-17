<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputItemTextBaseProps extends PolymorphicProps {}
export interface TagsInputItemTextProps
  extends TagsInputItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

defineProps<TagsInputItemTextProps>()
const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()
</script>

<template>
  <ark.span v-bind="tagsInput.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
