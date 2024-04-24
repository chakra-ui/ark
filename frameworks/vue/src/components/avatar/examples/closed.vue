<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, type AvatarRootEmits, type AvatarRootProps } from '../'
import { useForwardPropsEmits } from '../../../utils'

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
  <Avatar.Root class="root" v-bind="forwarded">
    <Avatar.Fallback class="fallback">{{ getInitials }}</Avatar.Fallback>
    <Avatar.Image :src="props.src" :alt="props.name" class="image" />
  </Avatar.Root>
</template>
