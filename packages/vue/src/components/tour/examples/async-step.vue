<script setup lang="ts">
import { Tour, useTour, type TourStepDetails } from '@ark-ui/vue/tour'
import { SparklesIcon, XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: TourStepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Async Data Loading',
    description: 'This tour demonstrates loading data before showing a step.',
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'user-info',
    type: 'tooltip',
    title: 'Loading...',
    description: 'Fetching user data...',
    target: () => document.querySelector<HTMLElement>('#user-card'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
    effect({ show, update }) {
      const controller = new AbortController()

      fetch('https://api.github.com/users/segunadebayo', { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          update({
            title: `Welcome, ${data.name || data.login}!`,
            description: `You have ${data.public_repos} public repositories and ${data.followers} followers.`,
          })
          show()
        })
        .catch(() => {
          update({
            title: 'User Profile',
            description: 'Could not load user data. Please try again.',
          })
          show()
        })

      return () => controller.abort()
    },
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Tour Complete',
    description: 'The async step loaded data from the GitHub API before displaying.',
    actions: [{ label: 'Done', action: 'dismiss' }],
  },
]

const tour = useTour({ steps })
</script>

<template>
  <div :class="styles.Root">
    <button type="button" data-variant="surface" :class="button.Root" @click="tour.start()">
      <SparklesIcon />
      Start Tour
    </button>

    <div id="user-card" :class="styles.Target">User Profile Card</div>

    <Tour.Root :tour="tour">
      <Teleport to="body">
        <Tour.Backdrop :class="styles.Backdrop" />
        <Tour.Spotlight :class="styles.Spotlight" />
        <Tour.Positioner :class="styles.Positioner">
          <Tour.Content :class="styles.Content">
            <Tour.Arrow :class="styles.Arrow">
              <Tour.ArrowTip :class="styles.ArrowTip" />
            </Tour.Arrow>
            <Tour.CloseTrigger :class="styles.CloseTrigger">
              <XIcon />
            </Tour.CloseTrigger>
            <Tour.ProgressText :class="styles.ProgressText" />
            <Tour.Title :class="styles.Title" />
            <Tour.Description :class="styles.Description" />
            <Tour.Control :class="styles.Control">
              <Tour.Actions v-slot="actions">
                <Tour.ActionTrigger
                  v-for="action in actions"
                  :key="action.label"
                  :class="styles.ActionTrigger"
                  :action="action"
                />
              </Tour.Actions>
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Teleport>
    </Tour.Root>
  </div>
</template>
