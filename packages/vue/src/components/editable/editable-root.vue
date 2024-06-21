<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './editable.types'

export interface EditableRootBaseProps extends RootProps, PolymorphicProps {}
export interface EditableRootProps
  extends EditableRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'placeholder'> {}
export interface EditableRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditable } from './use-editable'
import { EditableProvider } from './use-editable-context'

const props = withDefaults(defineProps<EditableRootProps>(), {
  autoResize: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  selectOnFocus: undefined,
  startWithEditView: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<EditableRootEmits>()

const editable = useEditable(props, emits)
EditableProvider(editable)
</script>

<template>
  <ark.div v-bind="editable.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
