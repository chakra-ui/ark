<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputHiddenInputBaseProps extends PolymorphicProps {}
export interface TagsInputHiddenInputProps
  extends TagsInputHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from '../field'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputHiddenInputProps>()

const tagsInput = useTagsInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="tagsInput.getHiddenInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
