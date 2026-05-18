<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './tags-input.types.ts'

export interface TagsInputRootBaseProps extends RootProps, PolymorphicProps {}
export interface TagsInputRootProps
  extends
    TagsInputRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TagsInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTagsInput } from './use-tags-input.ts'
import { TagsInputProvider } from './use-tags-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<TagsInputRootProps>(), {
  addOnPaste: undefined,
  allowDuplicates: undefined,
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
