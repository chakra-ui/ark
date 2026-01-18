<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-vue-next'
import styles from 'styles/carousel.module.css'

const items = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]
</script>

<template>
  <Carousel.Root :class="styles.Root" :slide-count="items.length" :auto-size="true" spacing="8px">
    <Carousel.Control :class="styles.Control">
      <Carousel.PrevTrigger :class="styles.Trigger">
        <ArrowLeftIcon />
      </Carousel.PrevTrigger>
      <Carousel.NextTrigger :class="styles.Trigger">
        <ArrowRightIcon />
      </Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.ItemGroup :class="styles.ItemGroup">
      <Carousel.Item v-for="(item, index) in items" :key="item.id" :index="index" snap-align="center">
        <div :class="styles.Slide" :style="{ width: item.width, height: '6rem' }">
          {{ item.label }}
        </div>
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.Context v-slot="api">
      <Carousel.IndicatorGroup :class="styles.IndicatorGroup">
        <Carousel.Indicator
          v-for="(_, index) in api.pageSnapPoints"
          :key="index"
          :class="styles.Indicator"
          :index="index"
        />
      </Carousel.IndicatorGroup>
    </Carousel.Context>
  </Carousel.Root>
</template>
