<script setup lang="ts">
import { Carousel } from '../'

const images = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
]
</script>

<template>
  <Carousel.Root>
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator
        v-for="(_, idx) in images"
        :key="idx"
        :index="idx"
        data-testid="indicator"
      >
        {{ idx + 1 }}
      </Carousel.Indicator>
    </Carousel.IndicatorGroup>
    <Carousel.Viewport>
      <Carousel.ItemGroup>
        <Carousel.Item v-for="(image, idx) in images" :key="idx" :index="idx" data-testid="item">
          <img :src="image" />
        </Carousel.Item>
      </Carousel.ItemGroup>
    </Carousel.Viewport>
  </Carousel.Root>
</template>
