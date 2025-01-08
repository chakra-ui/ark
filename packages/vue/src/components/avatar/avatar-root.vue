<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './avatar.types'

export interface AvatarRootBaseProps extends RootProps, PolymorphicProps {}
export interface AvatarRootProps
  extends AvatarRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface AvatarRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAvatar } from './use-avatar'
import { AvatarProvider } from './use-avatar-context'
import { useForwardExpose } from '../../utils'

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
