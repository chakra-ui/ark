<script setup lang="ts">
import { Carousel, useCarousel } from '@ark-ui/vue/carousel'

const images = Array(5).fill('https://picsum.photos/seed/a/500/300')

const carousel = useCarousel()
</script>

<template>
  <button @click="carousel.scrollToIndex(2)">Scroll to #3</button>
  <Carousel.RootProvider :value="carousel">
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator v-for="(_, idx) in images" :key="idx" :index="idx" />
    </Carousel.IndicatorGroup>
    <Carousel.ItemGroup>
      <Carousel.Item v-for="(image, idx) in images" :key="idx" :index="idx">
        <img :src="image" alt="" />
      </Carousel.Item>
    </Carousel.ItemGroup>
  </Carousel.RootProvider>
</template>
