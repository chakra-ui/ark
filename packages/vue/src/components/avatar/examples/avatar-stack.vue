<script setup lang="ts">
import { Avatar } from '@ark-ui/vue/avatar'
import { Menu } from '@ark-ui/vue/menu'
import styles from 'styles/avatar.module.css'
import menuStyles from 'styles/menu.module.css'

const users = [
  { id: 'pa', name: 'Pauline Adebayo', initials: 'PA', src: 'https://i.pravatar.cc/300?u=a' },
  { id: 'mk', name: 'Marcus Kim', initials: 'MK', src: 'https://i.pravatar.cc/300?u=b' },
  { id: 'jr', name: 'Jordan Reed', initials: 'JR', src: 'https://i.pravatar.cc/300?u=c' },
  { id: 'sl', name: 'Sara Liu', initials: 'SL', src: 'https://i.pravatar.cc/300?u=d' },
  { id: 'tw', name: 'Taylor West', initials: 'TW', src: 'https://i.pravatar.cc/300?u=e' },
]

const max = 3
const visible = users.slice(0, max)
const hidden = users.slice(max)
</script>

<template>
  <div :class="styles.Stack">
    <Avatar.Root v-for="user in visible" :key="user.id" :class="styles.Root">
      <Avatar.Fallback :class="styles.Fallback">{{ user.initials }}</Avatar.Fallback>
      <Avatar.Image :class="styles.Image" :src="user.src" :alt="user.name" />
    </Avatar.Root>
    <Menu.Root v-if="hidden.length > 0">
      <Menu.Trigger #render="ctx">
        <Avatar.Root v-bind="ctx.props" :class="styles.Root">
          <Avatar.Fallback :class="styles.Fallback">+{{ hidden.length }}</Avatar.Fallback>
        </Avatar.Root>
      </Menu.Trigger>
      <Teleport to="body">
        <Menu.Positioner>
          <Menu.Content :class="menuStyles.Content">
            <Menu.Item v-for="user in hidden" :key="user.id" :class="menuStyles.Item" :value="user.id">
              <Avatar.Root :class="styles.MenuAvatar">
                <Avatar.Fallback :class="styles.Fallback">{{ user.initials }}</Avatar.Fallback>
                <Avatar.Image :class="styles.Image" :src="user.src" :alt="user.name" />
              </Avatar.Root>
              {{ user.name }}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Teleport>
    </Menu.Root>
  </div>
</template>
