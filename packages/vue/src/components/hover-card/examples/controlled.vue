<script setup lang="ts">
import { HoverCard } from '@ark-ui/vue/hover-card'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/hover-card.module.css'

const open = ref(false)
</script>

<template>
  <div class="stack">
    <button type="button" :class="button.Root" @click="open = !open">Toggle</button>
    <HoverCard.Root v-model:open="open">
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
    </HoverCard.Root>
  </div>
</template>
