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
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TagsInputInputProps>()
const tagsInput = useTagsInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input :aria-describedby="field?.ariaDescribedby" v-bind="tagsInput.getInputProps()" :as-child="asChild">
    <slot />
  </ark.input>
</template>
