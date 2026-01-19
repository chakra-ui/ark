<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PasswordInputLabelBaseProps extends PolymorphicProps {}
export interface PasswordInputLabelProps
  extends
    PasswordInputLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<PasswordInputLabelProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="passwordInput.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
