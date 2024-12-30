'use client'
import { XIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Tour, useTour } from '~/components/ui/tour'

export const Demo = () => {
  const tour = useTour({ steps })

  return (
    <>
      <Button onClick={() => tour.start()}>Start Tour</Button>
      <Tour.Root tour={tour}>
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
            <Tour.CloseTrigger>
              <XIcon />
            </Tour.CloseTrigger>
            <Tour.Actions>
              {(actions) =>
                actions.map((action) => <Tour.ActionTrigger key={action.label} action={action} />)
              }
            </Tour.Actions>
          </Tour.Content>
        </Tour.Positioner>
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
    backdrop: false,
    arrow: false,
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
    backdrop: false,
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
]
