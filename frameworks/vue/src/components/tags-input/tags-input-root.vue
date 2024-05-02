<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './tags-input.types'

export interface TagsInputRootProps extends RootProps, PolymorphicProps {}
export interface TagsInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useTagsInput } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

const defaults: BooleanDefaults<RootProps> = {
  addOnPaste: undefined,
  allowOverflow: undefined,
  autoFocus: undefined,
  disabled: undefined,
  editable: undefined,
  invalid: undefined,
  readOnly: undefined,
}
const props = withDefaults(defineProps<TagsInputRootProps>(), defaults)
const emits = defineEmits<TagsInputRootEmits>()

const tagsInput = useTagsInput(props, emits)
TagsInputProvider(tagsInput)
</script>

<template>
  <ark.div v-bind="tagsInput.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
