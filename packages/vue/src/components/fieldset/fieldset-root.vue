<script lang="ts">
import type { FieldsetHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootProps } from './fieldset.types.ts'

export interface FieldsetRootBaseProps extends RootProps, PolymorphicProps {}
export interface FieldsetRootProps
  extends
    FieldsetRootBaseProps,
    /**
     * @vue-ignore
     */
    FieldsetHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFieldset } from './use-fieldset.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<FieldsetRootProps>(), {
  disabled: undefined,
  invalid: undefined,
} satisfies BooleanDefaults<RootProps>)

const fieldset = useFieldset(props)
FieldsetProvider(fieldset)

useForwardExpose()
</script>

<template>
  <ark.fieldset v-bind="fieldset.getRootProps()" :ref="fieldset.refs.rootRef" :as-child="asChild">
    <slot />
  </ark.fieldset>
</template>
