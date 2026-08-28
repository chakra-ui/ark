<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface PasswordInputInputBaseProps extends PolymorphicProps {}
export interface PasswordInputInputProps
  extends
    PasswordInputInputBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePasswordInputContext } from './use-password-input-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<PasswordInputInputProps>()

const passwordInput = usePasswordInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="passwordInput.getInputProps()" :aria-describedby="field?.ariaDescribedby" :as-child="asChild" />
</template>
