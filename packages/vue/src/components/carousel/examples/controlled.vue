<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { ref } from 'vue'

const images = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`)
const page = ref(0)
</script>

<template>
  <Carousel.Root v-model:page="page" :slide-count="images.length">
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
  </Carousel.Root>
  <p>Current page: {{ page }}</p>
</template>
