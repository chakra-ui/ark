<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TagsInputClearTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputClearTriggerProps>()
const tagsInput = useTagsInputContext()
</script>

<template>
  <ark.button v-bind="tagsInput.clearTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
