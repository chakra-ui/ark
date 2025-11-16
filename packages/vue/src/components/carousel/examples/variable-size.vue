<script setup lang="ts">
import { Carousel } from '../'

const items = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]
</script>

<template>
  <Carousel.Root :slide-count="items.length" :auto-size="true" spacing="8px">
    <Carousel.Control>
      <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.ItemGroup>
      <Carousel.Item v-for="(item, index) in items" :key="item.id" :index="index" snap-align="center">
        <div
          :style="{
            width: item.width,
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }"
        >
          {{ item.label }}
        </div>
      </Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator v-for="(_, index) in items" :key="index" :index="index" />
    </Carousel.IndicatorGroup>
  </Carousel.Root>
</template>
