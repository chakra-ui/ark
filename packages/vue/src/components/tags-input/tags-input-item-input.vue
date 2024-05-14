<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TagsInputItemInputProps extends PolymorphicProps {}
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
