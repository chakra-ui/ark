<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputClearTriggerProps
  extends
    TagsInputClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputClearTriggerProps>()
const tagsInput = useTagsInputContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tagsInput.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
