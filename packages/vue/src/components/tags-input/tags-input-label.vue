<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputLabelProps
  extends PolymorphicProps,
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
  <ark.label v-bind="tagsInput.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
