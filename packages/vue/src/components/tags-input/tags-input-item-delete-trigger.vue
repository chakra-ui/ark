<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputItemDeleteTriggerProps
  extends TagsInputItemDeleteTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

defineProps<TagsInputItemDeleteTriggerProps>()
const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tagsInput.getItemDeleteTriggerProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
