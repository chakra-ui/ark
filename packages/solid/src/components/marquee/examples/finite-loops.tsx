import { createSignal } from 'solid-js'
import { Marquee } from '@ark-ui/solid/marquee'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

export const FiniteLoops = () => {
  const [loopCount, setLoopCount] = createSignal(0)
  const [completedCount, setCompletedCount] = createSignal(0)

  return (
    <>
      <Marquee.Root
        loopCount={3}
        onLoopComplete={() => setLoopCount((prev) => prev + 1)}
        onComplete={() => setCompletedCount((prev) => prev + 1)}
      >
        <Marquee.Viewport>
          <Marquee.Content>
            {items.map((item) => (
              <div style={{ padding: '0 2rem' }}>{item}</div>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <div style={{ 'margin-top': '1rem' }}>
        <p>Loop completed: {loopCount()} times</p>
        <p>Animation completed: {completedCount()} times</p>
      </div>
    </>
  )
}
