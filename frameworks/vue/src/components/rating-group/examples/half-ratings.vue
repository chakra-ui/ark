<script setup lang="ts">
import { RatingGroup } from '../..'
import { StarHalfIcon, StarIcon, StarOutlineIcon } from './icons'
</script>

<template>
  <RatingGroup.Root :count="5" :model-value="3" allowHalf>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control v-slot="{ items }">
      <RatingGroup.Item
        v-for="item in items"
        :key="item"
        :index="item"
        v-slot="{ isHalf, isHighlighted }"
      >
        <StarHalfIcon v-if="isHalf" />
        <StarIcon v-else-if="isHighlighted" />
        <StarOutlineIcon v-else />
      </RatingGroup.Item>
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
