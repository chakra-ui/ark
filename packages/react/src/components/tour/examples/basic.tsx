import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour } from '@ark-ui/react/tour'
import { MoreHorizontalIcon, SaveIcon, SparklesIcon, UploadIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
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

export const Basic = () => {
  const tour = useTour({ steps })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Tour
      </button>

      <div className={styles.ActionButtons}>
        <button id="btn-upload" type="button" className={button.Root}>
          <UploadIcon /> Upload
        </button>
        <button id="btn-save" type="button" className={button.Root}>
          <SaveIcon /> Save
        </button>
        <button id="btn-more" type="button" className={button.Root}>
          <MoreHorizontalIcon /> More
        </button>
      </div>

      <Tour.Root tour={tour}>
        <Portal>
          <Tour.Backdrop className={styles.Backdrop} />
          <Tour.Spotlight className={styles.Spotlight} />
          <Tour.Positioner className={styles.Positioner}>
            <Tour.Content className={styles.Content}>
              <Tour.Arrow className={styles.Arrow}>
                <Tour.ArrowTip className={styles.ArrowTip} />
              </Tour.Arrow>
              <Tour.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Tour.CloseTrigger>
              <Tour.ProgressText className={styles.ProgressText} />
              <Tour.Title className={styles.Title} />
              <Tour.Description className={styles.Description} />
              <Tour.Control className={styles.Control}>
                <Tour.Actions>
                  {(actions) =>
                    actions.map((action) => (
                      <Tour.ActionTrigger className={styles.ActionTrigger} key={action.label} action={action} />
                    ))
                  }
                </Tour.Actions>
              </Tour.Control>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </div>
  )
}
