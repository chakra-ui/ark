import { For } from 'solid-js'
import { Marquee, useMarquee } from '@ark-ui/solid/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const ProgrammaticControl = () => {
  const marquee = useMarquee()

  return (
    <>
      <Marquee.RootProvider value={marquee}>
        <Marquee.Viewport>
          <Marquee.Content>
            <For each={items}>{(item) => <div style={{ padding: '0 2rem' }}>{item}</div>}</For>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>

      <div style={{ 'margin-top': '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => marquee().pause()}>Pause</button>
        <button onClick={() => marquee().resume()}>Resume</button>
      </div>
    </>
  )
}
