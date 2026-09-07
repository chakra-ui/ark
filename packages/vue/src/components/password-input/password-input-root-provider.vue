<script lang="ts">
import type { RootState } from '@zag-js/password-input'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UsePasswordInputReturn } from './use-password-input.ts'

export interface PasswordInputRootProviderState extends RootState {}
export interface PasswordInputRootProviderBaseProps extends PolymorphicProps {
  value: UnwrapRef<UsePasswordInputReturn>
}
export interface PasswordInputRootProviderProps
  extends
    PasswordInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PasswordInputRootProviderProps>()

defineSlots<PolymorphicSlots<PasswordInputRootProviderState>>()

PasswordInputProvider(computed(() => props.value))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="value.getRootProps()" :state="value.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
