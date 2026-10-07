<script setup lang="ts">
import { NumberFlow } from '@ark-ui/vue/number-flow'
import { MinusIcon, PlusIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const value = ref(1248)
</script>

<template>
  <div :class="styles.Card">
    <span :class="styles.Label">Followers</span>
    <NumberFlow.Root v-model="value" :class="[styles.Root, styles.Display]">
      <NumberFlow.Segments />
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
    <div :class="styles.Actions">
      <button type="button" :class="button.Root" @click="value--">
        <MinusIcon />
        Unfollow
      </button>
      <button type="button" :class="button.Root" data-variant="solid" @click="value++">
        <PlusIcon />
        Follow
      </button>
    </div>
  </div>
</template>
