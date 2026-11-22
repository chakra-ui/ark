import '@ark-ui/web/frame'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
    <ark-frame>
      <iframe title="Inherited Styles" style="border: 1px solid #ccc; width: 100%; height: var(--height)"></iframe>
      <h1>Ark UI / Frame</h1>
      <p style="margin-bottom: 10px; margin-top: 4px">This is a web component wrapped in an iframe.</p>
    </ark-frame>`

  const frame = root.querySelector('ark-frame')!

  frame.addEventListener('mount', () => {
    const head = frame.contentDocument?.head
    if (!head) return
    for (const node of document.head.querySelectorAll('style, link[rel="stylesheet"]')) {
      head.appendChild(node.cloneNode(true))
    }
  })
}
