import '@ark-ui/web/frame'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-frame>
      <iframe title="Custom Frame" style="border: 1px solid #ccc; width: 100%; height: var(--height)"></iframe>
      <template slot="head">
        <style>body { background-color: #f0f0f0; }</style>
      </template>
      <div style="padding: 40px">
        <h1>Hello from inside the frame!</h1>
        <p>This content is rendered within our custom frame component.</p>
      </div>
    </ark-frame>`
}
