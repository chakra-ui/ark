'use client'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { IconButton } from '~/components/ui/icon-button'
import { Tour, useTour } from '~/components/ui/tour'

export const Demo = () => {
  const tour = useTour({ steps })

  return (
    <>
      <Button onClick={() => tour.start()}>Start Tour</Button>
      <Tour.Root tour={tour}>
        <Portal>
          <Tour.Backdrop />
          <Tour.Spotlight />
          <Tour.Positioner>
            <Tour.Content>
              <Tour.Arrow>
                <Tour.ArrowTip />
              </Tour.Arrow>
              <Tour.Title />
              <Tour.Description />
              <Tour.ProgressText />
              <Tour.CloseTrigger asChild>
                <IconButton size="sm" variant="link">
                  <XIcon />
                </IconButton>
              </Tour.CloseTrigger>
              <Tour.Control>
                <Tour.Actions>
                  {(actions) =>
                    actions.map((action) => (
                      <Tour.ActionTrigger key={action.label} action={action} asChild>
                        <Button variant="link" size="sm">
                          {action.label}
                        </Button>
                      </Tour.ActionTrigger>
                    ))
                  }
                </Tour.Actions>
              </Tour.Control>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </>
  )
}

const steps: Tour.StepDetails[] = [
  {
    id: 'step-1',
    type: 'dialog',
    title: 'Step 1',
    description: 'This is the first step',
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Step 2. Inside a scrollable container',
    description: 'Using scrollIntoView(...) rocks!',
    target: () => document.querySelector<HTMLElement>('#framework-select'),
    arrow: false,
    backdrop: true,
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Step 2. Inside a scrollable container',
    description: 'Using scrollIntoView(...) rocks!',
    target: () => document.querySelector<HTMLElement>('#version-select'),
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Done', action: 'dismiss' },
    ],
  },
]
