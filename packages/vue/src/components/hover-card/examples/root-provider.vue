<script setup lang="ts">
import { HoverCard, useHoverCard } from '@ark-ui/vue/hover-card'
import styles from 'styles/hover-card.module.css'

const hoverCard = useHoverCard()
</script>

<template>
  <div class="stack">
    <output>Open: {{ String(hoverCard.open) }}</output>
    <HoverCard.RootProvider :value="hoverCard">
      <p>
        Liked by
        <HoverCard.Trigger :class="styles.Trigger" as-child>
          <a href="#profile">@sarah_chen</a>
        </HoverCard.Trigger>
        and 3 others
      </p>
      <Teleport to="body">
        <HoverCard.Positioner>
          <HoverCard.Content :class="styles.Content">
            <HoverCard.Arrow :class="styles.Arrow">
              <HoverCard.ArrowTip :class="styles.ArrowTip" />
            </HoverCard.Arrow>
            <div :class="styles.Body">
              <img :class="styles.Avatar" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
              <div>
                <p :class="styles.Name">Sarah Chen</p>
                <p :class="styles.Username">@sarah_chen</p>
              </div>
              <p :class="styles.Bio">Design Engineer at Acme Inc.</p>
            </div>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Teleport>
    </HoverCard.RootProvider>
  </div>
</template>
