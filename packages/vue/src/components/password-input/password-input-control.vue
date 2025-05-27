<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface PasswordInputControlBaseProps extends PolymorphicProps {}
export interface PasswordInputControlProps
  extends PasswordInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'
import { useForwardExpose } from '../../utils'

defineProps<PasswordInputControlProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="passwordInput.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
