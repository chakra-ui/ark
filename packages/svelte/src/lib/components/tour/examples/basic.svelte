<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tour, useTour, type TourStepDetails } from '@ark-ui/svelte/tour'
  import { MoreHorizontalIcon, SaveIcon, SparklesIcon, UploadIcon, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/tour.module.css'

  const steps: TourStepDetails[] = [
    {
      id: 'welcome',
      type: 'dialog',
      title: 'Welcome to the App!',
      description: "Let's take a quick tour to get you started with the main features.",
      actions: [{ label: 'Start Tour', action: 'next' }],
    },
    {
      id: 'upload',
      type: 'tooltip',
      title: 'Upload Files',
      description: 'Click here to upload your files to the cloud.',
      target: () => document.querySelector<HTMLElement>('#btn-upload'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'save',
      type: 'tooltip',
      title: 'Save Changes',
      description: 'Save your work to keep your progress.',
      target: () => document.querySelector<HTMLElement>('#btn-save'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'more',
      type: 'tooltip',
      title: 'More Options',
      description: 'Access additional settings and actions from this menu.',
      target: () => document.querySelector<HTMLElement>('#btn-more'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'complete',
      type: 'dialog',
      title: "You're all set!",
      description: 'You now know the basics. Enjoy using the app!',
      actions: [{ label: 'Finish', action: 'dismiss' }],
    },
  ]

  const tour = useTour({ steps })
</script>

<div class={styles.Root}>
  <button type="button" data-variant="surface" class={button.Root} onclick={() => tour().start()}>
    <SparklesIcon /> Start Tour
  </button>

  <div class={styles.ActionButtons}>
    <button id="btn-upload" type="button" class={button.Root}>
      <UploadIcon /> Upload
    </button>
    <button id="btn-save" type="button" class={button.Root}>
      <SaveIcon /> Save
    </button>
    <button id="btn-more" type="button" class={button.Root}>
      <MoreHorizontalIcon /> More
    </button>
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
