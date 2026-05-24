<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UsePasswordInputReturn } from './use-password-input.ts'

export interface PasswordInputRootProviderBaseProps extends PolymorphicProps {
  value: UnwrapRef<UsePasswordInputReturn>
}
export interface PasswordInputRootProviderProps
  extends
    PasswordInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { PasswordInputProvider } from './use-password-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<PasswordInputRootProviderProps>()

PasswordInputProvider(computed(() => props.value))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="value.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
