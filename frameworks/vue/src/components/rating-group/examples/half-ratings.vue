<script setup lang="ts">
import { RatingGroup } from '../..'
import { StarHalfIcon, StarIcon, StarOutlineIcon } from './icons'
</script>

<template>
  <RatingGroup.Root :count="5" :model-value="3" allowHalf>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context v-slot="{ items }">
        <RatingGroup.Item v-for="item in items" :key="item" :index="item">
          <RatingGroup.ItemContext v-slot="{ highlighted, half }">
            <StarHalfIcon v-if="half" />
            <StarIcon v-else-if="highlighted" />
            <StarOutlineIcon v-else />
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
