<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputItemInputBaseProps extends PolymorphicProps {}
export interface TagsInputItemInputProps
  extends
    TagsInputItemInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputItemInputProps>()

const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="tagsInput.getItemInputProps(itemProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
