<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PasswordInputIndicatorBaseProps extends PolymorphicProps {
  /**
   * The fallback content to display when the password is not visible.
   */
  fallback?: string
}
export interface PasswordInputIndicatorProps
  extends
    PasswordInputIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<PasswordInputIndicatorProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="passwordInput.getIndicatorProps()" :as-child="asChild">
    <template v-if="passwordInput.visible">
      <slot />
    </template>
    <template v-else>
      <slot name="fallback" :fallback="fallback">
        {{ fallback }}
      </slot>
    </template>
  </ark.span>
</template>
