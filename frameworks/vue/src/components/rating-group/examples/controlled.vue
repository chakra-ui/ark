<script setup lang="ts">
import { ref } from 'vue'
import { RatingGroup } from '../..'
import { StarHalfIcon, StarIcon, StarOutlineIcon } from './icons'

const value = ref(0)
</script>

<template>
  <RatingGroup.Root :count="5" v-model="value" allowHalf>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context v-slot="{ items }">
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
      </RatingGroup.Context>
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
