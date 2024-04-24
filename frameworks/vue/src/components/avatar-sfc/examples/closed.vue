<script setup lang="ts">
import { computed } from 'vue'
import { useForwardPropsEmits } from '../../../utils'
import AvatarFallback from '../avatar-fallback.vue'
import AvatarImage from '../avatar-image.vue'
import AvatarRoot from '../avatar-root.vue'
import type { AvatarRootEmits, AvatarRootProps } from '../avatar.types'

export interface AvatarProps extends AvatarRootProps {
  src?: string
  name: string
}

const props = defineProps<AvatarProps>()
const emits = defineEmits<AvatarRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
const getInitials = computed(() =>
  props.name
    .split(' ')
    .map((part) => part[0])
    .splice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <AvatarRoot class="root" v-bind="forwarded">
    <AvatarFallback class="fallback">{{ getInitials }}</AvatarFallback>
    <AvatarImage :src="props.src" :alt="props.name" class="image" />
  </AvatarRoot>
</template>