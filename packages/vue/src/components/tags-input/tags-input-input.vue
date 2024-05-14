<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TagsInputInputProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'

defineProps<TagsInputInputProps>()
const tagsInput = useTagsInputContext()
</script>

<template>
  <ark.input v-bind="tagsInput.inputProps" :as-child="asChild" />
</template>
