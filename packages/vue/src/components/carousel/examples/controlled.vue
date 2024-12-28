<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { ref } from 'vue'

const images = Array(5).fill('https://picsum.photos/seed/a/500/300')
const page = ref(0)
</script>

<template>
  <Carousel.Root v-model:page="page">
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
</template>
