<script setup lang="ts">
import { Marquee } from '@ark-ui/vue/marquee'
import styles from 'styles/marquee.module.css'

const items = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Banana', logo: '🍌' },
  { name: 'Cherry', logo: '🍒' },
  { name: 'Grape', logo: '🍇' },
  { name: 'Watermelon', logo: '🍉' },
  { name: 'Strawberry', logo: '🍓' },
]
</script>

<template>
  <div class="stack">
    <div>
      <h3>Slow (25px/s)</h3>
      <Marquee.Root :speed="25" :class="styles.Root">
        <Marquee.Viewport :class="styles.Viewport">
          <Marquee.Content :class="styles.Content">
            <Marquee.Item v-for="item in items" :key="item.name" :class="styles.Item">
              <span :class="styles.ItemLogo">{{ item.logo }}</span>
              <span :class="styles.ItemName">{{ item.name }}</span>
            </Marquee.Item>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Normal (50px/s)</h3>
      <Marquee.Root :speed="50" :class="styles.Root">
        <Marquee.Viewport :class="styles.Viewport">
          <Marquee.Content :class="styles.Content">
            <Marquee.Item v-for="item in items" :key="item.name" :class="styles.Item">
              <span :class="styles.ItemLogo">{{ item.logo }}</span>
              <span :class="styles.ItemName">{{ item.name }}</span>
            </Marquee.Item>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>

    <div>
      <h3>Fast (100px/s)</h3>
      <Marquee.Root :speed="100" :class="styles.Root">
        <Marquee.Viewport :class="styles.Viewport">
          <Marquee.Content :class="styles.Content">
            <Marquee.Item v-for="item in items" :key="item.name" :class="styles.Item">
              <span :class="styles.ItemLogo">{{ item.logo }}</span>
              <span :class="styles.ItemName">{{ item.name }}</span>
            </Marquee.Item>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </div>
  </div>
</template>
