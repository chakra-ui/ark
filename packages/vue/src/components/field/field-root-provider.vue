<script lang="ts">
import type { RootState } from '@zag-js/field'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseFieldReturn } from './use-field.ts'

interface RootProviderProps {
  value: UnwrapRef<UseFieldReturn>
}

export interface FieldRootProviderState extends RootState {}
export interface FieldRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldRootProviderProps
  extends
    FieldRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { type PolymorphicSlots, ark } from '../factory.ts'
import { FieldProvider } from './use-field-context.ts'

const props = defineProps<FieldRootProviderProps>()
const field = computed(() => props.value)

defineSlots<PolymorphicSlots<FieldRootProviderState>>()

FieldProvider(field)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="field.getRootProps()" :state="field.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
