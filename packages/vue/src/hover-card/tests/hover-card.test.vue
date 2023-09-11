<script setup lang="ts">
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '..'
</script>
<template>
  <HoverCard :open-delay="0" :close-delay="0">
    <HoverCardTrigger>Hover me</HoverCardTrigger>
    <Teleport to="body">
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          Content
        </HoverCardContent>
      </HoverCardPositioner>
    </Teleport>
  </HoverCard>
</template>
