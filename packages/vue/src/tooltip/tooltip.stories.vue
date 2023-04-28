<script setup lang="ts">
import { Teleport } from 'vue'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '.'
</script>
<template>
  <Story title="Tooltip - Basic">
    <Tooltip :open-delay="1000" :close-delay="0">
      <TooltipTrigger>
        <span>hover me</span>
      </TooltipTrigger>
      <Teleport to="body">
        <TooltipPositioner>
          <TooltipArrow>
            <TooltipArrowTip />
          </TooltipArrow>
          <TooltipContent>My Tooltip</TooltipContent>
        </TooltipPositioner>
      </Teleport>
    </Tooltip>
  </Story>
</template>
