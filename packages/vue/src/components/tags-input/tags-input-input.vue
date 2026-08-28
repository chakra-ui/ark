<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TagsInputInputBaseProps extends PolymorphicProps {}
export interface TagsInputInputProps
  extends
    TagsInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTagsInputContext } from './use-tags-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputInputProps>()
const tagsInput = useTagsInputContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="tagsInput.getInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
