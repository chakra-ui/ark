<script setup lang="ts">
import { computed } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot, type AvatarRootEmits } from '../'
import { useForwardPropsEmits } from '../../../utils'

export interface AvatarProps {
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