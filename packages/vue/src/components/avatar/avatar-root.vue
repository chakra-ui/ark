<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './avatar.types.ts'

export interface AvatarRootBaseProps extends RootProps, PolymorphicProps {}
export interface AvatarRootProps
  extends
    AvatarRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface AvatarRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useAvatar } from './use-avatar.ts'
import { AvatarProvider } from './use-avatar-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<AvatarRootProps>()
const emits = defineEmits<AvatarRootEmits>()

const avatar = useAvatar(props, emits)
AvatarProvider(avatar)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="avatar.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
