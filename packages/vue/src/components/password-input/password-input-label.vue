<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PasswordInputLabelProps>()

const passwordInput = usePasswordInputContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="passwordInput.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
