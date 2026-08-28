<script lang="ts">
import type { FieldsetHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseFieldsetReturn } from './use-fieldset.ts'

interface RootProviderProps {
  value: UnwrapRef<UseFieldsetReturn>
}

export interface FieldsetRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldsetRootProviderProps
  extends
    FieldsetRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    FieldsetHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<FieldsetRootProviderProps>()
const fieldset = computed(() => props.value)

FieldsetProvider(fieldset)

useForwardExpose()
</script>

<template>
  <ark.fieldset v-bind="fieldset.getRootProps()" :as-child="asChild">
    <slot />
  </ark.fieldset>
</template>
