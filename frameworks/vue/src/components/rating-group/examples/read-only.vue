<script setup lang="ts">
import { RatingGroup } from '../..'
</script>

<template>
  <RatingGroup.Root :count="5" :model-value="3" readOnly>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control v-slot="{ items }">
      <RatingGroup.Item v-for="item in items" :key="item" :index="item" v-slot="{ isHighlighted }">
        <StarIcon v-if="isHighlighted" />
        <StarOutlineIcon v-else />
      </RatingGroup.Item>
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
