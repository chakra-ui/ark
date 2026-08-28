<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseAvatarReturn } from './use-avatar.ts'

interface RootProviderProps {
  value: UnwrapRef<UseAvatarReturn>
}

export interface AvatarRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AvatarRootProviderProps
  extends
    AvatarRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { AvatarProvider } from './use-avatar-context.ts'

const props = defineProps<AvatarRootProviderProps>()
const avatar = computed(() => props.value)

AvatarProvider(avatar)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="avatar.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
