<script lang="ts">
import type { RootState } from '@zag-js/fieldset'
import type { FieldsetHTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseFieldsetReturn } from './use-fieldset.ts'

interface RootProviderProps {
  value: UnwrapRef<UseFieldsetReturn>
}

export interface FieldsetRootProviderState extends RootState {}
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
import { type PolymorphicSlots, ark } from '../factory.ts'
import { FieldsetProvider } from './use-fieldset-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<FieldsetRootProviderProps>()
defineSlots<PolymorphicSlots<FieldsetRootProviderState>>()
const fieldset = computed(() => props.value)

FieldsetProvider(fieldset)

useForwardExpose()
</script>

<template>
  <ark.fieldset v-bind="fieldset.getRootProps()" :state="fieldset.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.fieldset>
</template>
