<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseCheckboxGroupReturn } from './use-checkbox-group.ts'

interface GroupProviderProps {
  value: UnwrapRef<UseCheckboxGroupReturn>
}

export interface CheckboxGroupProviderBaseProps extends GroupProviderProps, PolymorphicProps {}
export interface CheckboxGroupProviderProps
  extends
    CheckboxGroupProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { CheckboxGroupContextProvider } from './use-checkbox-group-context.tsx'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { checkboxAnatomy } from './checkbox.anatomy.ts'

const props = defineProps<CheckboxGroupProviderProps>()
const checkboxGroup = computed(() => props.value)

CheckboxGroupContextProvider(checkboxGroup)

useForwardExpose()
</script>

<template>
  <ark.div role="group" v-bind="checkboxAnatomy.build().group.attrs" :as-child="asChild">
    <slot />
  </ark.div>
</template>
