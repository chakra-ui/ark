<script lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AvatarImageProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ImgHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAvatarContext } from './use-avatar-context'

defineProps<AvatarImageProps>()
const avatar = useAvatarContext()
</script>

<template>
  <ark.img v-bind="avatar.getImageProps()" :as-child="asChild" />
</template>
