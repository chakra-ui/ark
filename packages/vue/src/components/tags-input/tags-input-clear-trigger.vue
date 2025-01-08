<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputClearTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputClearTriggerProps
  extends TagsInputClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useForwardExpose } from '../../utils'

defineProps<TagsInputClearTriggerProps>()
const tagsInput = useTagsInputContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tagsInput.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
