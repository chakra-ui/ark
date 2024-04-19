<script setup lang="ts">
import {
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupItem,
  RatingGroupItemContext,
  RatingGroupLabel,
  RatingGroupRoot,
} from '..'
</script>

<template>
  <RatingGroupRoot>
    <RatingGroupLabel>Label</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupContext v-slot="ratingGroup">
        <RatingGroupItem v-for="item in ratingGroup.items" :key="item" :index="item">
          <RatingGroupItemContext v-slot="{ isHighlighted }">
            {{ item ? 'half' : isHighlighted ? 'highlighted' : 'empty' }}
          </RatingGroupItemContext>
        </RatingGroupItem>
      </RatingGroupContext>
    </RatingGroupControl>
  </RatingGroupRoot>
</template>
