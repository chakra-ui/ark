<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'

const images = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
  'https://tinyurl.com/6jurv23t',
  'https://tinyurl.com/yp4rfum7',
]
</script>

<template>
  <Carousel.Root>
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator v-for="(_, idx) in images" :key="idx" :index="idx">
        {{ idx + 1 }}
      </Carousel.Indicator>
    </Carousel.IndicatorGroup>
    <Carousel.Viewport>
      <Carousel.ItemGroup>
        <Carousel.Item v-for="(image, idx) in images" :key="idx" :index="idx">
          <img
            :src="image"
            alt=""
            :style="{ height: '300px', width: '100%', objectFit: 'cover' }"
          />
        </Carousel.Item>
      </Carousel.ItemGroup>
    </Carousel.Viewport>
  </Carousel.Root>
</template>
