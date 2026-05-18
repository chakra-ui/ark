<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './password-input.types.ts'

export interface PasswordInputRootBaseProps extends RootProps, PolymorphicProps {}
export interface PasswordInputRootProps
  extends
    PasswordInputRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface PasswordInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePasswordInput } from './use-password-input.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<PasswordInputRootProps>(), {
  defaultVisible: undefined,
  disabled: undefined,
  ignorePasswordManagers: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  visible: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<PasswordInputRootEmits>()

const passwordInput = usePasswordInput(props, emits)

PasswordInputProvider(passwordInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="passwordInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
