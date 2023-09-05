<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '.'
import './tooltip.css'
</script>

<template>
  <Story title="Tooltip">
    <Variant title="Basic">
      <Tooltip>
        <TooltipTrigger>Hover Me</TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent>I am a tooltip!</TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    </Variant>
  </Story>
</template>
