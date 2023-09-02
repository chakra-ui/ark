<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '.'
</script>
<template>
  <Story>
    <Variant title="Basic">
      <Tooltip :close-on-esc="true">
        <TooltipTrigger>Hover Me</TooltipTrigger>
        <Teleport to="body">
          <TooltipPositioner>
            <TooltipContent>I am a tooltip!</TooltipContent>
          </TooltipPositioner>
        </Teleport>
      </Tooltip>
    </Variant>
  </Story>
</template>
