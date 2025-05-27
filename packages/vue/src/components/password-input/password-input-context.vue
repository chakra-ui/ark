<script lang="ts">
import type { UsePasswordInputReturn } from './use-password-input'

export interface PasswordInputContextProps {
  value: UsePasswordInputReturn
}
</script>

<script setup lang="ts">
import { usePasswordInputContext } from './use-password-input-context'

defineProps<PasswordInputContextProps>()

const passwordInput = usePasswordInputContext()
</script>

<template>
  <slot v-bind="passwordInput" />
</template>
