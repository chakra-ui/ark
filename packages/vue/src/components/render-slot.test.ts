import { render, screen } from '@testing-library/vue'
import RenderSlotTrigger from './popover/tests/render-slot-trigger.vue'
import RenderSlotState from './popover/tests/render-slot-state.vue'
import RenderSlotPlain from './popover/tests/render-slot-plain.vue'
import RenderSlotValueText from './progress/tests/render-slot-value-text.vue'
import RenderSlotImage from './avatar/tests/render-slot-image.vue'

describe('render slot', () => {
  it('reaches a part that renders a bare slot', () => {
    render(RenderSlotTrigger)
    const el = screen.getByTestId('t')
    expect(el.tagName).toBe('A')
    expect(el).toHaveTextContent('Open')
    expect(el).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('forwards the part state', () => {
    render(RenderSlotState)
    expect(screen.getByRole('button')).toHaveTextContent('off')
  })

  it('reaches a part whose slot has fallback content', () => {
    render(RenderSlotValueText)
    expect(screen.getByTestId('v').tagName).toBe('EM')
  })

  it('reaches a part that renders no slot at all', () => {
    render(RenderSlotImage)
    expect(screen.getByTestId('i')).toBeInTheDocument()
  })

  it('leaves plain children alone when no render slot is given', () => {
    render(RenderSlotPlain)
    const btn = screen.getByRole('button')
    expect(btn).toHaveTextContent('Plain')
    expect(btn.tagName).toBe('BUTTON')
  })
})
