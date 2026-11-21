import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/checkbox'
import '@ark-ui/web/dialog'
import '@ark-ui/web/toggle'

const user = userEvent.setup()

const checkboxMarkup = /* html */ `
  <ark-checkbox>
    <label>
      <ark-checkbox-control></ark-checkbox-control>
      <ark-checkbox-label>Accept</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

const dialogMarkup = (title: string) => /* html */ `
  <ark-dialog>
    <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
    <ark-dialog-positioner>
      <ark-dialog-content><ark-dialog-title>${title}</ark-dialog-title><button>Inside</button></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

const recordDetails = (selector: string, type: string) => {
  const details: unknown[] = []
  document.querySelector(selector)!.addEventListener(type, (event) => details.push((event as CustomEvent).detail))
  return details
}

const tick = (ms = 20) => new Promise((resolve) => setTimeout(resolve, ms))

test('user interaction reports the input source', async () => {
  document.body.innerHTML = checkboxMarkup
  const details = recordDetails('ark-checkbox', 'checkedchange')
  const checkbox = await screen.findByRole('checkbox')

  await user.click(screen.getByText('Accept', { exact: true }))
  await waitFor(() => expect(details).toHaveLength(1))

  checkbox.focus()
  await user.keyboard(' ')

  await waitFor(() =>
    expect(details).toEqual([
      { checked: true, source: 'mouse' },
      { checked: false, source: 'keyboard' },
    ]),
  )
})

test('api calls report a programmatic source, even after recent input', async () => {
  document.body.innerHTML = checkboxMarkup
  const details = recordDetails('ark-checkbox', 'checkedchange')

  await user.click(await screen.findByText('Accept', { exact: true }))
  await tick()
  document.querySelector('ark-checkbox')!.api!.setChecked(false)

  await waitFor(() =>
    expect(details).toEqual([
      { checked: true, source: 'mouse' },
      { checked: false, source: 'programmatic' },
    ]),
  )
})

test('bare callback values are wrapped in an object with a source', async () => {
  document.body.innerHTML = /* html */ `<ark-toggle><button>Bold</button></ark-toggle>`
  const details = recordDetails('ark-toggle', 'pressedchange')

  await user.click(await screen.findByRole('button', { name: 'Bold' }))

  await waitFor(() => expect(details).toEqual([{ pressed: true, source: 'mouse' }]))
})

test('zag reasons are kept alongside the source', async () => {
  document.body.innerHTML = dialogMarkup('Title')
  const details = recordDetails('ark-dialog', 'openchange')

  await user.click(await screen.findByRole('button', { name: 'Open' }))
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  await user.keyboard('{Escape}')
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())

  await tick()
  document.querySelector('ark-dialog')!.api!.setOpen(true)

  await waitFor(() =>
    expect(details).toEqual([
      { open: true, reason: 'trigger-click', source: 'mouse' },
      { open: false, reason: 'escape-key', source: 'keyboard' },
      { open: true, reason: 'script', source: 'programmatic' },
    ]),
  )
})

test('notifications preserve details and compose through shadow roots without bubbling', async () => {
  const host = document.createElement('div')
  const shadow = host.attachShadow({ mode: 'open' })
  shadow.innerHTML = /* html */ `<ark-checkbox><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>Accept</ark-checkbox-label><ark-checkbox-hidden-input></ark-checkbox-hidden-input></label></ark-checkbox>`
  document.body.append(host)

  const received: unknown[] = []
  const bubbled: string[] = []

  const record = (place: string, event: Event) => {
    const change = event as CustomEvent<{ checked: boolean }>
    received.push({
      place,
      checked: change.detail.checked,
      bubbles: change.bubbles,
      composed: change.composed,
      cancelable: change.cancelable,
    })
  }

  const onBubble = () => bubbled.push('document')
  const onCapture = (event: Event) => record('capture', event)

  shadow.querySelector('ark-checkbox')!.addEventListener('checkedchange', (event) => record('root', event))
  shadow.addEventListener('checkedchange', () => bubbled.push('shadow'))
  document.addEventListener('checkedchange', onBubble)
  document.addEventListener('checkedchange', onCapture, { capture: true })

  try {
    await waitFor(() => expect(shadow.querySelector('[data-checkbox-label]')).not.toBeNull())
    await user.click(shadow.querySelector('ark-checkbox-label')!)

    await waitFor(() => expect(received).toHaveLength(2))
    expect(bubbled).toEqual([])
    expect(received).toEqual([
      { place: 'capture', checked: true, bubbles: false, composed: true, cancelable: false },
      { place: 'root', checked: true, bubbles: false, composed: true, cancelable: false },
    ])
  } finally {
    document.removeEventListener('checkedchange', onBubble)
    document.removeEventListener('checkedchange', onCapture, { capture: true })
  }
})

test('escape notifications forward cancellation to the original keyboard event', async () => {
  document.body.innerHTML = dialogMarkup('Confirm')

  document.querySelector('ark-dialog')!.addEventListener(
    'escapekeydown',
    (event) => {
      if (event.detail.key === 'Escape') event.preventDefault()
    },
    { once: true },
  )

  await user.click(await screen.findByRole('button', { name: 'Open' }))
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  await user.keyboard('{Escape}')
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  await user.keyboard('{Escape}')
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
})
