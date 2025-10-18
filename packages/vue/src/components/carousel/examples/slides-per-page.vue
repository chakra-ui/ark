<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'

const slides = Array.from({ length: 5 }, (_, i) => i)
</script>

<template>
  <Carousel.Root :slide-count="slides.length" :slides-per-page="2" spacing="20px">
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.ItemGroup>
      <Carousel.Item v-for="(_, idx) in slides" :key="idx" :index="idx">
        <div
          :style="{
            width: '100%',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f0f0f0',
          }"
        >
          Slide {{ idx + 1 }}
        </div>
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.Context v-slot="api">
      <Carousel.IndicatorGroup>
        <Carousel.Indicator v-for="(_, idx) in api.pageSnapPoints" :key="idx" :index="idx" />
      </Carousel.IndicatorGroup>
    </Carousel.Context>
  </Carousel.Root>
</template>
