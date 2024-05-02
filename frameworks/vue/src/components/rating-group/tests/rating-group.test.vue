<script setup lang="ts">
import { RatingGroup } from '..'
</script>

<template>
  <RatingGroup.Root>
    <RatingGroup.Label>Label</RatingGroup.Label>
    <RatingGroup.Control>
      <RatingGroup.Context v-slot="ratingGroup">
        <RatingGroup.Item v-for="item in ratingGroup.items" :key="item" :index="item">
          <RatingGroup.ItemContext v-slot="{ highlighted }">
            {{ item ? 'half' : highlighted ? 'highlighted' : 'empty' }}
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
