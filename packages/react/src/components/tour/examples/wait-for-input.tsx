import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour, waitForEvent } from '@ark-ui/react/tour'
import { SparklesIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
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

export const WaitForInput = () => {
  const tour = useTour({ steps })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Form Tutorial
      </button>

      <div className={styles.Form}>
        <div className={styles.FormField}>
          <label htmlFor="input-name">Name</label>
          <input id="input-name" type="text" placeholder="Enter your name" className={styles.Input} />
        </div>
        <div className={styles.FormField}>
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" placeholder="Enter your email" className={styles.Input} />
        </div>
        <div className={styles.FormFieldInline}>
          <input id="checkbox-terms" type="checkbox" className={styles.Checkbox} />
          <label htmlFor="checkbox-terms">I accept the terms and conditions</label>
        </div>
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
