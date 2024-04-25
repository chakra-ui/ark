<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TagsInputInputProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { computed } from 'vue'

defineProps<TagsInputInputProps>()
const tagsInput = useTagsInputContext()

const inputProps = computed(() => ({
  ...tagsInput.value.inputProps,
  modelValue: tagsInput.value.inputValue,
}))
</script>

<template>
  <ark.input v-bind="inputProps" :as-child="asChild" />
</template>
