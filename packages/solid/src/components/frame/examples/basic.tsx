import { Frame } from '@ark-ui/solid/frame'

export const Basic = () => {
  return (
    <Frame
      title="Custom Frame"
      style={{ border: '1px solid #ccc', width: '100%', height: 'var(--height)' }}
      head={<style>{'body { background-color: #f0f0f0; }'}</style>}
    >
      <div style={{ padding: '40px' }}>
        <h1>Hello from inside the frame!</h1>
        <p>This content is rendered within our custom frame component using a Portal.</p>
      </div>
    </Frame>
  )
}
