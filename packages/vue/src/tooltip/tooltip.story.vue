<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '.'
import { TooltipPresence } from './tooltip-presence'
import './tooltip.css'
</script>

<template>
  <Story title="Tooltip">
    <Variant title="Basic">
      <Tooltip :close-on-esc="true">
        <TooltipTrigger>Hover Me</TooltipTrigger>
        <TooltipPositioner>
          <TooltipPresence>
            <TooltipContent>I am a tooltip!</TooltipContent>
          </TooltipPresence>
        </TooltipPositioner>
      </Tooltip>
    </Variant>
  </Story>
</template>
