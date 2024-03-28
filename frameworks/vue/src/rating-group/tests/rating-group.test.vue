<script setup lang="ts">
import { RatingGroup } from '../'
</script>

<template>
  <RatingGroup.Root>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control v-slot="{ items }">
      <RatingGroup.Item
        v-for="item in items"
        :key="item"
        :index="item"
        v-slot="{ isHalf, isHighlighted }"
      >
        {{ isHalf ? 'half' : isHighlighted ? 'highlighted' : 'empty' }}
      </RatingGroup.Item>
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
