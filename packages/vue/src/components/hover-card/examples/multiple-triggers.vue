<script setup lang="ts">
import { HoverCard } from '@ark-ui/vue/hover-card'
import { ref } from 'vue'
import styles from 'styles/hover-card.module.css'

interface Profile {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
}

const profiles: Profile[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    username: '@sarah_chen',
    avatar: 'https://i.pravatar.cc/300?u=sarah',
    bio: 'Design Engineer at Acme Inc. Building beautiful interfaces.',
  },
  {
    id: 'alex',
    name: 'Alex Rivera',
    username: '@alex_r',
    avatar: 'https://i.pravatar.cc/300?u=alex',
    bio: 'Full-stack developer and open source contributor.',
  },
  {
    id: 'jordan',
    name: 'Jordan Lee',
    username: '@jordan_lee',
    avatar: 'https://i.pravatar.cc/300?u=jordan',
    bio: 'DevOps lead. Automating all the things.',
  },
]

const activeProfile = ref<Profile | null>(null)
</script>

<template>
  <HoverCard.Root @trigger-value-change="(e) => (activeProfile = profiles.find((p) => p.id === e.value) ?? null)">
    <p :class="styles.Paragraph">
      Reviewed by
      <HoverCard.Trigger value="sarah" as-child>
        <a href="#" :class="styles.Trigger">@sarah_chen</a>
      </HoverCard.Trigger>
      ,
      <HoverCard.Trigger value="alex" as-child>
        <a href="#" :class="styles.Trigger">@alex_r</a>
      </HoverCard.Trigger>
      , and
      <HoverCard.Trigger value="jordan" as-child>
        <a href="#" :class="styles.Trigger">@jordan_lee</a>
      </HoverCard.Trigger>
    </p>
    <Teleport to="body">
      <HoverCard.Positioner>
        <HoverCard.Content :class="styles.Content">
          <HoverCard.Arrow :class="styles.Arrow">
            <HoverCard.ArrowTip :class="styles.ArrowTip" />
          </HoverCard.Arrow>
          <div v-if="activeProfile" :class="styles.Body">
            <div :class="styles.Header">
              <img :class="styles.Avatar" :src="activeProfile.avatar" :alt="activeProfile.name" />
            </div>
            <div>
              <p :class="styles.Name">{{ activeProfile.name }}</p>
              <p :class="styles.Username">{{ activeProfile.username }}</p>
            </div>
            <p :class="styles.Bio">{{ activeProfile.bio }}</p>
          </div>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Teleport>
  </HoverCard.Root>
</template>
