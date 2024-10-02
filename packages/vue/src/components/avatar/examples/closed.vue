<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Avatar, type AvatarRootEmits, type AvatarRootProps } from '@ark-ui/vue/avatar'
import { computed } from 'vue'

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
