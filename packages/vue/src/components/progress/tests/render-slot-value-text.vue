<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
</script>

<template>
  <Progress.Root :value="40">
    <Progress.ValueText #render="ctx">
      <em v-bind="ctx.props" data-testid="v">40%</em>
    </Progress.ValueText>
  </Progress.Root>
</template>
