import { waitFor } from '@testing-library/dom'

import { mount as TextSelection } from '../examples/text-selection.js'
import { mount } from '../../../test-utils.js'

test('selecting text in the paragraph opens the toolbar', async () => {
  mount(TextSelection)
  const popover = document.querySelector('ark-popover')!
  await popover.ready

  document.getSelection()!.selectAllChildren(document.querySelector('p')!)
  document.dispatchEvent(new PointerEvent('pointerup'))

  await waitFor(() => expect(popover.open).toBe(true))

  document.getSelection()!.removeAllRanges()
  document.dispatchEvent(new Event('selectionchange'))

  await waitFor(() => expect(popover.open).toBe(false))
})
