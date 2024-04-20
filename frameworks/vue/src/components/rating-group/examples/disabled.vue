<script setup lang="ts">
import { ref } from 'vue'
import { RatingGroup } from '../..'
import { StarHalfIcon, StarIcon, StarOutlineIcon } from './rating-icons'

const value = ref(0)
</script>

<template>
  <RatingGroup.Root :count="5" :model-value="3" disabled>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control v-slot="{ items }">
      <RatingGroup.Item v-for="item in items" :key="item" :index="item" v-slot="{ isHighlighted }">
        <StarIcon v-if="isHighlighted" />
        <StarOutlineIcon v-else />
      </RatingGroup.Item>
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
