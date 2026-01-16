<script setup lang="ts">
import { RatingGroup, useRatingGroup } from '@ark-ui/vue/rating-group'
import { StarIcon } from 'lucide-vue-next'
import styles from 'styles/rating-group.module.css'

const ratingGroup = useRatingGroup({ defaultValue: 3 })
</script>

<template>
  <div class="stack">
    <output>value: {{ ratingGroup.value }}</output>
    <RatingGroup.RootProvider :class="styles.Root" :value="ratingGroup">
      <RatingGroup.Label :class="styles.Label">Label</RatingGroup.Label>
      <RatingGroup.Control :class="styles.Control">
        <RatingGroup.Context v-slot="{ items }">
          <RatingGroup.Item v-for="item in items" :key="item" :class="styles.Item" :index="item">
            <RatingGroup.ItemContext v-slot="{ highlighted }">
              <span :class="styles.ItemIndicator" :data-highlighted="highlighted ? '' : undefined">
                <StarIcon data-bg="" />
                <StarIcon data-fg="" fill="currentColor" />
              </span>
            </RatingGroup.ItemContext>
          </RatingGroup.Item>
        </RatingGroup.Context>
        <RatingGroup.HiddenInput />
      </RatingGroup.Control>
    </RatingGroup.RootProvider>
  </div>
</template>
