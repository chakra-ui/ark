<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootProps } from './field.types.ts'

export interface FieldRootBaseProps extends RootProps, PolymorphicProps {}
export interface FieldRootProps
  extends
    FieldRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useField } from './use-field.ts'
import { FieldProvider } from './use-field-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<FieldRootProps>(), {
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const field = useField(props)
FieldProvider(field)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="field.getRootProps()" :ref="field.refs.rootRef" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
