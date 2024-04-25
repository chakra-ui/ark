<script lang="ts">
import type { RootEmits, RootProps } from './tags-input.types'

export interface TagsInputRootProps extends RootProps, PolimoprhicProps {}
export interface TagsInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark, type PolimoprhicProps } from '../factory'
import { useTagsInput } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

const props = withDefaults(defineProps<TagsInputRootProps>(), { editable: true })
const emits = defineEmits<TagsInputRootEmits>()
const attrs = useAttrs()

const tagsInput = useTagsInput(props, emits)
TagsInputProvider(tagsInput)

const rootProps = computed(() => ({
  ...attrs,
  ...tagsInput.value.rootProps,
}))
</script>

<template>
  <ark.div v-bind="rootProps" :as-child="asChild">
    <slot />
  </ark.div>
  <input v-bind="tagsInput.hiddenInputProps" />
</template>
