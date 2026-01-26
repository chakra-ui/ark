<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<PasswordInputVisibilityTriggerProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="passwordInput.getVisibilityTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
