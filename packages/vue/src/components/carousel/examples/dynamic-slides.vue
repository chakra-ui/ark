<script setup lang="ts">
import { Carousel } from '@ark-ui/vue/carousel'
import { ref } from 'vue'

const slides = ref([0, 1, 2, 3, 4])
const page = ref(0)

const addSlide = () => {
  const max = Math.max(...slides.value)
  slides.value = [...slides.value, max + 1]
}
</script>

<template>
  <div>
    <Carousel.Root v-model:page="page" :slide-count="slides.length">
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        <Carousel.Indicator v-for="(_, idx) in slides" :key="idx" :index="idx" />
      </Carousel.IndicatorGroup>
      <Carousel.ItemGroup>
        <Carousel.Item v-for="(slide, idx) in slides" :key="idx" :index="idx">
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              width: '100%',
              backgroundColor: `hsl(${(slide * 60) % 360}, 70%, 60%)`,
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              borderRadius: '8px',
            }"
          >
            Slide {{ slide }}
          </div>
        </Carousel.Item>
      </Carousel.ItemGroup>
    </Carousel.Root>
    <button @click="addSlide" :style="{ marginTop: '16px', padding: '8px 16px', cursor: 'pointer' }">Add Slide</button>
  </div>
</template>
