<script lang="ts">
import type { FieldsetHTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootProps } from './fieldset.types'

export interface FieldsetRootBaseProps extends RootProps, PolymorphicProps {}
export interface FieldsetRootProps
  extends FieldsetRootBaseProps,
    /**
     * @vue-ignore
     */
    FieldsetHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldset } from './use-fieldset'
import { FieldsetProvider } from './use-fieldset-context'
import { useForwardExpose } from '../../utils'

const props = withDefaults(defineProps<FieldsetRootProps>(), {
  disabled: undefined,
  invalid: undefined,
} satisfies BooleanDefaults<RootProps>)

const fieldset = useFieldset(props)
FieldsetProvider(fieldset)

useForwardExpose()
</script>

<template>
  <ark.fieldset v-bind="fieldset.getRootProps()" :as-child="asChild">
    <slot />
  </ark.fieldset>
</template>
