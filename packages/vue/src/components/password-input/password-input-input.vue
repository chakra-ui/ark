<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { usePasswordInputContext } from './use-password-input-context'
import { useFieldContext } from '../field'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<PasswordInputInputProps>()

const passwordInput = usePasswordInputContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="passwordInput.getInputProps()" :aria-describedby="field?.ariaDescribedby" :as-child="asChild" />
</template>
