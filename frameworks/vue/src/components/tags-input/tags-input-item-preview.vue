<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface TagsInputItemPreviewProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

defineProps<TagsInputItemPreviewProps>()
const tagsInput = useTagsInputContext()
const itemProps = useTagsInputItemPropsContext()
</script>

<template>
  <ark.div v-bind="tagsInput.getItemPreviewProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
