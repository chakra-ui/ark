<script setup lang="ts">
import { ref, type UnwrapRef } from 'vue'
import { Rating, RatingGroup, RatingGroupControl, RatingGroupLabel } from '..'
import type { RatingGroupContext } from '../rating-group-context'
import { IconEmpty, IconFull, IconHalf } from './rating-icons'

// For tests
const props = withDefaults(defineProps<{ max?: number; defaultValue?: number }>(), {
  max: 5,
  defaultValue: 3,
})

const defaultRef = ref(props.defaultValue)
</script>
<template>
  <RatingGroup :max="props.max" v-model="defaultRef" allowHalf>
    <RatingGroupLabel>Label</RatingGroupLabel>
    <RatingGroupControl v-slot="{ sizeArray }: UnwrapRef<RatingGroupContext>">
      <Rating
        v-for="idx in sizeArray"
        :key="idx"
        :index="idx"
        v-slot="{
          isHalf,
          isHighlighted,
        }: ReturnType<UnwrapRef<RatingGroupContext>['getRatingState']>"
      >
        <IconHalf v-if="isHalf" />
        <IconFull v-else-if="isHighlighted" />
        <IconEmpty v-else />
      </Rating>
    </RatingGroupControl>
  </RatingGroup>
</template>
