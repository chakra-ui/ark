<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TagsInputItemInputBaseProps extends PolymorphicProps {}
export interface TagsInputItemInputProps
  extends TagsInputItemInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

defineProps<TagsInputItemInputProps>()
const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()
</script>

<template>
  <ark.input v-bind="tagsInput.getItemInputProps(itemProps)" :as-child="asChild" />
</template>
