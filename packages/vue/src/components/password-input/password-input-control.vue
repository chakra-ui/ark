<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PasswordInputControlBaseProps extends PolymorphicProps {}
export interface PasswordInputControlProps
  extends
    PasswordInputControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PasswordInputControlProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="passwordInput.getControlProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
