<script setup lang="ts">
import { HoverCard } from '@ark-ui/vue/hover-card'
import styles from 'styles/hover-card.module.css'
</script>

<template>
  <HoverCard.Root>
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
            <div :class="styles.Header">
              <img :class="styles.Avatar" src="https://i.pravatar.cc/300?u=sarah" alt="Sarah Chen" />
              <button type="button" :class="styles.FollowButton">Follow</button>
            </div>
            <div>
              <p :class="styles.Name">Sarah Chen</p>
              <p :class="styles.Username">@sarah_chen</p>
            </div>
            <p :class="styles.Bio">Design Engineer at Acme Inc. Building beautiful interfaces and design systems.</p>
            <div :class="styles.Stats">
              <div :class="styles.Stat">
                <span :class="styles.StatValue">2,456</span>
                <span :class="styles.StatLabel">Following</span>
              </div>
              <div :class="styles.Stat">
                <span :class="styles.StatValue">14.5K</span>
                <span :class="styles.StatLabel">Followers</span>
              </div>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Teleport>
  </HoverCard.Root>
</template>
