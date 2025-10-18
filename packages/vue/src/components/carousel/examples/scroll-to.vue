<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
</script>

<template>
  <Carousel.Root :slide-count="5">
    <Carousel.Context v-slot="carousel">
      <button @click="carousel.scrollToIndex(3)">Go to slide 4</button>
    </Carousel.Context>
    <Carousel.ItemGroup>
      <Carousel.Item v-for="index in 5" :key="index" :index="index - 1">
        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '300px',
            backgroundColor: '#f0f0f0',
            fontSize: '24px',
            fontWeight: 'bold',
            borderRadius: '8px',
          }"
        >
          Slide {{ index }}
        </div>
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator v-for="index in 5" :key="index" :index="index - 1" />
    </Carousel.IndicatorGroup>
  </Carousel.Root>
</template>
