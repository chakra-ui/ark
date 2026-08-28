<script setup lang="ts">
import { Format } from '@ark-ui/vue/format'
import styles from 'styles/format.module.css'
</script>

<template>
  <div :class="styles.Inline">
    <span :class="styles.InlineLabel">Support window</span>
    <span :class="styles.InlineValue">
      <Format.Time value="17:15:00" :format="'12h'" am-label="morning" pm-label="evening" />
    </span>
  </div>
</template>
