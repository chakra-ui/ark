<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseAvatarReturn } from './use-avatar'

interface RootProviderProps {
  value: UnwrapRef<UseAvatarReturn>
}

export interface AvatarRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface AvatarRootProviderProps
  extends AvatarRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { AvatarProvider } from './use-avatar-context'

const props = defineProps<AvatarRootProviderProps>()
const avatar = computed(() => props.value)

AvatarProvider(avatar)
</script>

<template>
  <ark.div v-bind="avatar.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
