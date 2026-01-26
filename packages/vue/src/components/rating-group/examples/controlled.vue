<script setup lang="ts">
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { StarIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import styles from 'styles/rating-group.module.css'

const value = ref(0)
</script>

<template>
  <RatingGroup.Root :class="styles.Root" v-model="value">
    <RatingGroup.Label :class="styles.Label">Label</RatingGroup.Label>
    <RatingGroup.Control :class="styles.Control">
      <RatingGroup.Context v-slot="{ items }">
        <RatingGroup.Item v-for="item in items" :key="item" :class="styles.Item" :index="item">
          <RatingGroup.ItemContext v-slot="{ half, highlighted }">
            <span
              :class="styles.ItemIndicator"
              :data-half="half ? '' : undefined"
              :data-highlighted="highlighted ? '' : undefined"
            >
              <StarIcon data-bg="" />
              <StarIcon data-fg="" fill="currentColor" />
            </span>
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
