<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'
</script>

<template>
  <div :class="styles.Inline">
    <span :class="styles.InlineLabel">Last sync</span>
    <span :class="styles.InlineValue">
      <Format.Time value="03:07:19" :format="'12h'" :with-seconds="true" />
    </span>
  </div>
</template>
