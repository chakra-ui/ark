import { Tour, type UseTourProps, useTour } from '@ark-ui/solid/tour'
import { Portal } from '@solidjs/web'
import { For } from 'solid-js'

const steps: Tour.StepDetails[] = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'Take a quick tour',
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'save',
    type: 'tooltip',
    title: 'Save your work',
    description: 'Click here to save',
    target: () => document.querySelector<HTMLElement>('#save'),
    actions: [
      { label: 'Back', action: 'previous' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'done',
    type: 'dialog',
    title: 'All set',
    description: 'Enjoy the app',
    actions: [{ label: 'Finish', action: 'dismiss' }],
  },
]

export const ComponentUnderTest = (props: Omit<UseTourProps, 'steps'>) => {
  const tour = useTour(() => ({ steps, ...props }))

  return (
    <>
      <button type="button" onClick={() => tour().start()}>
        Start tour
      </button>
      <button type="button" id="save">
        Save
      </button>
      <Tour.Root tour={tour}>
        <Portal>
          <Tour.Backdrop data-testid="backdrop" />
          <Tour.Spotlight data-testid="spotlight" />
          <Tour.Positioner data-testid="positioner">
            <Tour.Content>
              <Tour.Arrow>
                <Tour.ArrowTip />
              </Tour.Arrow>
              <Tour.CloseTrigger>Close tour</Tour.CloseTrigger>
              <Tour.ProgressText data-testid="progress" />
              <Tour.Title />
              <Tour.Description />
              <Tour.Control>
                <Tour.Actions>
                  {(actions) => <For each={actions()}>{(action) => <Tour.ActionTrigger action={action} />}</For>}
                </Tour.Actions>
              </Tour.Control>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </>
  )
}
