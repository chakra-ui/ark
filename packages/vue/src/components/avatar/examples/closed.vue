<script setup lang="ts">
import { computed } from 'vue'
import { Avatar } from '../../..'
import { useForwardPropsEmits } from '../../..'

export interface AvatarProps extends Avatar.RootProps {
  src?: string
  name: string
}

const props = defineProps<AvatarProps>()
const emits = defineEmits<Avatar.RootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const getInitials = computed(() =>
  props.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <Avatar.Root v-bind="forwarded">
    <Avatar.Fallback>{{ getInitials }}</Avatar.Fallback>
    <Avatar.Image :src="props.src" :alt="props.name" />
  </Avatar.Root>
</template>
