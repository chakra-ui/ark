<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './tags-input.types'

export interface TagsInputRootBaseProps extends RootProps, PolymorphicProps {}
export interface TagsInputRootProps
  extends TagsInputRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TagsInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTagsInput } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'
import { useForwardExpose } from '../../utils'

const props = withDefaults(defineProps<TagsInputRootProps>(), {
  addOnPaste: undefined,
  allowOverflow: undefined,
  autoFocus: undefined,
  disabled: undefined,
  editable: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TagsInputRootEmits>()

const tagsInput = useTagsInput(props, emits)
TagsInputProvider(tagsInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="tagsInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
