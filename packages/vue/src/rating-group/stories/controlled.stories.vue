<script setup lang="ts">
import { ref } from 'vue'
import {
  Rating,
  RatingGroup,
  RatingGroupControl,
  RatingGroupLabel,
  type RatingContext,
  type RatingGroupProps,
} from '..'
import type { RatingGroupContext } from '../rating-group-context'
import { IconEmpty, IconFull, IconHalf } from './rating-icons'

const value = ref<RatingGroupProps['modelValue']>(3)
</script>
<template>
  <button @click="value = 5">Set to 5 stars</button>
  <RatingGroup v-model="value" allowHalf>
    <RatingGroupLabel>Label</RatingGroupLabel>
    <RatingGroupControl v-slot="{ sizeArray }: RatingGroupContext">
      <Rating
        v-for="idx in sizeArray"
        :key="idx"
        :index="idx"
        v-slot="{ isHalf, isHighlighted }: RatingContext"
      >
        <IconHalf v-if="isHalf" />
        <IconFull v-else-if="isHighlighted" />
        <IconEmpty v-else />
      </Rating>
    </RatingGroupControl>
  </RatingGroup>
</template>
