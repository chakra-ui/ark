<script setup lang="ts">
import { RatingGroup, useRatingGroup } from '@ark-ui/vue/rating-group'
import { StarIcon } from 'lucide-vue-next'

const ratingGroup = useRatingGroup({ count: 5, modelValue: 3 })
</script>

<template>
  <button @click="ratingGroup.clearValue()">Clear</button>

  <RatingGroup.RootProvider :value="ratingGroup">
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context v-slot="{ items }">
        <RatingGroup.Item v-for="item in items" :key="item" :index="item">
          <RatingGroup.ItemContext v-slot="{ highlighted }">
            <StarIcon v-if="highlighted" fill="current" />
            <StarIcon v-else />
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.RootProvider>
</template>
