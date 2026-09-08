<script lang="ts">
import type { VisibilityTriggerState } from '@zag-js/password-input'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface PasswordInputVisibilityTriggerState extends VisibilityTriggerState {}
export interface PasswordInputVisibilityTriggerBaseProps extends PolymorphicProps {}
export interface PasswordInputVisibilityTriggerProps
  extends
    PasswordInputVisibilityTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PasswordInputVisibilityTriggerProps>()

defineSlots<PolymorphicSlots<PasswordInputVisibilityTriggerState>>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <ark.button
    v-bind="passwordInput.getVisibilityTriggerProps()"
    :state="passwordInput.getVisibilityTriggerState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
