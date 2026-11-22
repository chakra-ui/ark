import '@ark-ui/web/frame'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-frame>
      <iframe title="Custom Frame" style="border: 1px solid #ccc; width: 100%; height: var(--height)"></iframe>
      <div style="padding: 40px">
        <h1>Hello from inside the frame!</h1>
        <p>This content is rendered within our custom frame component.</p>
      </div>
    </ark-frame>`

  const frame = root.querySelector('ark-frame')!

  frame.addEventListener('mount', () => {
    const doc = frame.contentDocument
    if (!doc) return
    const script = doc.createElement('script')
    script.textContent = 'console.log("Hello from inside the frame!")'
    doc.body.appendChild(script)
  })
}
