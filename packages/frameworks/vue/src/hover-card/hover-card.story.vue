<script setup lang="ts">
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '.'
import './hover-card.css'
</script>

<template>
  <Story title="Hover Card">
    <Variant title="Basic">
      <HoverCard>
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
    </Variant>
  </Story>
</template>
