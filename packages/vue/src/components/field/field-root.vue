<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootProps } from './field.types'

export interface FieldRootBaseProps extends RootProps, PolymorphicProps {}
export interface FieldRootProps
  extends FieldRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useField } from './use-field'
import { FieldProvider } from './use-field-context'

const props = withDefaults(defineProps<FieldRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)
const field = useField(props)
FieldProvider(field)
</script>

<template>
  <ark.div v-bind="field.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
