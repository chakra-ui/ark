<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputInputBaseProps extends PolymorphicProps {}
export interface TagsInputInputProps
  extends TagsInputInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputInputProps>()
const tagsInput = useTagsInputContext()
</script>

<template>
  <ark.input v-bind="tagsInput.getInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
