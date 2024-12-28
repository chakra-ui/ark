<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'

const images = Array(5).fill('https://picsum.photos/seed/a/500/300')
</script>

<template>
  <Carousel.Root>
    <Carousel.Control>
      <Carousel.AutoplayTrigger>Play or Pause</Carousel.AutoplayTrigger>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator v-for="(_, idx) in images" :key="idx" :index="idx" />
    </Carousel.IndicatorGroup>
      <Carousel.ItemGroup>
        <Carousel.Item v-for="(image, idx) in images" :key="idx" :index="idx">
          <img
            :src="image"
            alt=""
            :style="{ height: '300px', width: '100%', objectFit: 'cover' }"
          />
        </Carousel.Item>
      </Carousel.ItemGroup>
  </Carousel.Root>
</template>
