import { Tour } from '@ark-ui/react/tour'
import { Frame } from '../../frame'

export const DemoTour = () => {
  return (
    <Tour.Root>
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
          <Tour.CloseTrigger />
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
        <button>Start Tour</button>
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
