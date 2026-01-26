import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour } from '@ark-ui/react/tour'
import { SparklesIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
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

export const AsyncStep = () => {
  const tour = useTour({ steps })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Tour
      </button>

      <div id="user-card" className={styles.Target}>
        User Profile Card
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
