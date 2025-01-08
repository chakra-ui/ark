<script setup lang="ts">
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { StarHalfIcon, StarIcon } from 'lucide-vue-next'
</script>

<template>
  <RatingGroup.Root :count="5" :model-value="3.5" allowHalf>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context v-slot="{ items }">
        <RatingGroup.Item v-for="item in items" :key="item" :index="item">
          <RatingGroup.ItemContext v-slot="{ highlighted, half }">
            <StarHalfIcon v-if="half" />
            <StarIcon v-else-if="highlighted" fill="current" />
            <StarIcon v-else />
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
