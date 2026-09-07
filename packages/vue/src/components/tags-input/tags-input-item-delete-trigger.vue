<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface TagsInputItemDeleteTriggerProps
  extends
    TagsInputItemDeleteTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputItemDeleteTriggerProps>()
const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="tagsInput.getItemDeleteTriggerProps(itemProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
