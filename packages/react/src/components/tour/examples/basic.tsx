import { Tour, useTour } from '@ark-ui/react/tour'
import type { StepDetails } from '@zag-js/tour'
import { XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Frame } from '../../frame'

export const DemoTour = () => {
  const tour = useTour({ steps: tourData })

  // Start the tour when the component mounts
  useEffect(() => {
    tour.start()
  }, [tour])

  return (
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
  )
}

export const Basic = () => {
  return (
    <main className="tour">
      <div>
        <div className="steps__container">
          <h3 id="step-1">Step 1</h3>
          <div className="overflow__container">
            <div className="h-200px" />
            <h3 id="step-2">Step 2</h3>
            <div className="h-100px" />
          </div>
          <Frame>
            <h1 id="step-2a">Iframe Content</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </Frame>
          <h3 id="step-3">Step 3</h3>
          <h3 id="step-4">Step 4</h3>
        </div>
        <DemoTour />
      </div>
    </main>
  )
}

export const tourData: StepDetails[] = [
  {
    type: 'dialog',
    id: 'step-0',
    title: 'Centered tour (no target)',
    description: 'This is the center of the world. Ready to start the tour?',
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    type: 'tooltip',
    id: 'step-1',
    title: 'Step 1. Welcome',
    description: 'To the new world',
    target: () => document.querySelector<HTMLElement>('#step-1'),
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
    effect({ show, update }) {
      const abort = new AbortController()

      fetch('https://api.github.com/users/octocat', { signal: abort.signal })
        .then((res) => res.json())
        .then((data) => {
          update({ title: data.name })
          show()
        })

      return () => {
        abort.abort()
      }
    },
  },
  {
    type: 'tooltip',
    id: 'step-2',
    title: 'Step 2. Inside a scrollable container',
    description: 'Using scrollIntoView(...) rocks!',
    target: () => document.querySelector<HTMLElement>('#step-2'),
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    type: 'tooltip',
    id: 'step-2a',
    title: 'Step 2a. Inside an Iframe container',
    description: 'It calculates the offset rect correctly. Thanks to floating UI!',
    target: () => {
      const [frameEl] = Array.from(frames)
      return frameEl?.document.querySelector<HTMLElement>('#step-2a')
    },
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    type: 'tooltip',
    id: 'step-3',
    title: 'Step 3. Normal scrolling',
    description: 'The new world is a great place',
    target: () => document.querySelector<HTMLElement>('#step-3'),
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    type: 'tooltip',
    id: 'step-4',
    title: 'Step 4. Close to bottom',
    description: 'So nice to see the scrolling works!',
    target: () => document.querySelector<HTMLElement>('#step-4'),
    actions: [
      { label: 'Prev', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    type: 'dialog',
    id: 'step-5',
    title: "You're all sorted! (no target)",
    description: 'Thanks for trying out the tour. Enjoy the app!',
    actions: [{ label: 'Finish', action: 'dismiss' }],
  },
]
