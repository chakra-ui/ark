<script setup lang="ts">
import { Tour, useTour, waitForElement, waitForEvent, type TourStepDetails } from '@ark-ui/vue/tour'
import { PlusIcon, SparklesIcon, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: TourStepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Dynamic Elements',
    description: 'This tour demonstrates waiting for elements that appear dynamically.',
    actions: [{ label: 'Start', action: 'next' }],
  },
  {
    id: 'add-item',
    type: 'tooltip',
    title: 'Add an Item',
    description: 'Click the button to add a new item to the list.',
    target: () => document.querySelector<HTMLElement>('#btn-add-item'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'new-item',
    type: 'tooltip',
    title: 'New Item Added!',
    description: 'The tour waited for this element to appear before showing this step.',
    target: () => document.querySelector<HTMLElement>('[data-item="new"]'),
    effect({ show }) {
      const [promise, cancel] = waitForElement(() => document.querySelector<HTMLElement>('[data-item="new"]'), {
        timeout: 5000,
      })
      promise.then(() => show())
      return () => cancel()
    },
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Tour Complete',
    description: 'You learned how to use waitForElement for dynamic content.',
    actions: [{ label: 'Done', action: 'dismiss' }],
  },
]

const tour = useTour({ steps })
const items = ref<string[]>(['Item 1', 'Item 2'])

const addItem = () => {
  items.value = [...items.value, `Item ${items.value.length + 1}`]
}
</script>

<template>
  <div :class="styles.Root">
    <button type="button" data-variant="surface" :class="button.Root" @click="tour.start()">
      <SparklesIcon />
      Start Tour
    </button>

    <button id="btn-add-item" type="button" :class="button.Root" @click="addItem">
      <PlusIcon />
      Add Item
    </button>

    <div :class="styles.List">
      <div
        v-for="(item, index) in items"
        :key="item"
        :class="styles.ListItem"
        :data-item="index === items.length - 1 && items.length > 2 ? 'new' : undefined"
      >
        {{ item }}
      </div>
    </div>

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
