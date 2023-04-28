<script setup lang="ts">
import { Teleport } from 'vue'
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
  <Story title="HoverCard - Basic">
    <HoverCard>
      <HoverCardTrigger>
        <a href="https://mastodon.com/zag_js" target="_blank" rel="noreferrer"> Mastodon </a>
      </HoverCardTrigger>

      <Teleport to="body">
        <HoverCardPositioner>
          <HoverCardContent>
            <HoverCardArrow>
              <HoverCardArrowTip />
            </HoverCardArrow>
            Mastodon Preview
          </HoverCardContent>
        </HoverCardPositioner>
      </Teleport>
    </HoverCard>
  </Story>
</template>
