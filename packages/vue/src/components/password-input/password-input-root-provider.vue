<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UsePasswordInputReturn } from './use-password-input'

export interface PasswordInputRootProviderBaseProps extends PolymorphicProps {
  value: UnwrapRef<UsePasswordInputReturn>
}
export interface PasswordInputRootProviderProps
  extends PasswordInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { PasswordInputProvider } from './use-password-input-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<PasswordInputRootProviderProps>()

PasswordInputProvider(computed(() => props.value))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="value.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
