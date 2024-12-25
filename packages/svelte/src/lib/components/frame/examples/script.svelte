<script lang="ts">
  import { Frame } from '@ark-ui/svelte/frame'

  let frameRef: HTMLIFrameElement | undefined
</script>

<Frame
  title="Custom Frame"
  bind:ref={frameRef}
  onMount={() => {
    const doc = frameRef?.contentDocument
    if (!doc) return
    const script = doc.createElement('script')
    script.innerHTML = 'console.log("Hello from inside the frame!")'
    doc.body.appendChild(script)
  }}
  style="border: 1px solid #ccc; width: 100%; height: var(--height)"
>
  <div style="padding: 40px">
    <h1>Hello from inside the frame!</h1>
    <p>This content is rendered within our custom frame component using a Portal.</p>
  </div>
</Frame>
