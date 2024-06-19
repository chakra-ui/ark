<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputLabelBaseProps extends PolymorphicProps {}
export interface TagsInputLabelProps
  extends TagsInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputLabelProps>()
const tagsInput = useTagsInputContext()
</script>

<template>
  <ark.label v-bind="tagsInput.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
