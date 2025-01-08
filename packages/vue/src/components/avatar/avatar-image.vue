<script lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AvatarImageBaseProps extends PolymorphicProps {}
export interface AvatarImageProps
  extends AvatarImageBaseProps,
    /**
     * @vue-ignore
     */
    ImgHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

defineProps<AvatarImageProps>()
const avatar = useAvatarContext()

useForwardExpose()
</script>

<template>
  <ark.img v-bind="avatar.getImageProps()" :as-child="asChild" />
</template>
