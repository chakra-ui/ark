<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tour, useTour, waitForEvent, type TourStepDetails } from '@ark-ui/svelte/tour'
  import { SparklesIcon, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/tour.module.css'

  const steps: TourStepDetails[] = [
    {
      id: 'intro',
      type: 'dialog',
      title: 'Form Tutorial',
      description: 'Learn how to fill out the form by following the guided steps.',
      actions: [{ label: 'Start', action: 'next' }],
    },
    {
      id: 'enter-name',
      type: 'tooltip',
      title: 'Enter Your Name',
      description: 'Type your name in the input field to continue.',
      target: () => document.querySelector<HTMLInputElement>('#input-name'),
      effect({ next, target, show }) {
        show()
        const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
          predicate: (el) => el.value.trim().length >= 2,
        })
        promise.then(() => next())
        return cancel
      },
    },
    {
      id: 'enter-email',
      type: 'tooltip',
      title: 'Enter Your Email',
      description: 'Now enter a valid email address.',
      target: () => document.querySelector<HTMLInputElement>('#input-email'),
      effect({ next, target, show }) {
        show()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'input', {
          predicate: (el) => emailRegex.test(el.value),
        })
        promise.then(() => next())
        return cancel
      },
    },
    {
      id: 'check-terms',
      type: 'tooltip',
      title: 'Accept Terms',
      description: 'Check the checkbox to accept the terms.',
      target: () => document.querySelector<HTMLInputElement>('#checkbox-terms'),
      effect({ next, target, show }) {
        show()
        const [promise, cancel] = waitForEvent<HTMLInputElement>(target, 'change', {
          predicate: (el) => el.checked,
        })
        promise.then(() => next())
        return cancel
      },
    },
    {
      id: 'complete',
      type: 'dialog',
      title: 'Form Complete!',
      description: 'You have successfully filled out the form.',
      actions: [{ label: 'Done', action: 'dismiss' }],
    },
  ]

  const tour = useTour({ steps })
</script>

<div class={styles.Root}>
  <button type="button" data-variant="surface" class={button.Root} onclick={() => tour().start()}>
    <SparklesIcon /> Start Form Tutorial
  </button>

  <div class={styles.Form}>
    <div class={styles.FormField}>
      <label for="input-name">Name</label>
      <input id="input-name" type="text" placeholder="Enter your name" class={styles.Input} />
    </div>
    <div class={styles.FormField}>
      <label for="input-email">Email</label>
      <input id="input-email" type="email" placeholder="Enter your email" class={styles.Input} />
    </div>
    <div class={styles.FormFieldInline}>
      <input id="checkbox-terms" type="checkbox" class={styles.Checkbox} />
      <label for="checkbox-terms">I accept the terms and conditions</label>
    </div>
  </div>

  <Tour.Root {tour}>
    <Portal>
      <Tour.Backdrop class={styles.Backdrop} />
      <Tour.Spotlight class={styles.Spotlight} />
      <Tour.Positioner class={styles.Positioner}>
        <Tour.Content class={styles.Content}>
          <Tour.Arrow class={styles.Arrow}>
            <Tour.ArrowTip class={styles.ArrowTip} />
          </Tour.Arrow>
          <Tour.CloseTrigger class={styles.CloseTrigger}>
            <XIcon />
          </Tour.CloseTrigger>
          <Tour.ProgressText class={styles.ProgressText} />
          <Tour.Title class={styles.Title} />
          <Tour.Description class={styles.Description} />
          <Tour.Control class={styles.Control}>
            <Tour.Actions>
              {#snippet children(actions)}
                {#each actions() as action (action.label)}
                  <Tour.ActionTrigger class={styles.ActionTrigger} {action} />
                {/each}
              {/snippet}
            </Tour.Actions>
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Portal>
  </Tour.Root>
</div>
