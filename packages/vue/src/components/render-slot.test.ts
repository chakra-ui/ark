import { render, screen } from '@testing-library/vue'
import { defineComponent } from 'vue'
import { Avatar } from './avatar/index.ts'
import { Popover } from './popover/index.ts'
import { Progress } from './progress/index.ts'

const mount = (components: Record<string, unknown>, template: string) =>
  render(defineComponent({ components: components as never, template }))

describe('render slot', () => {
  it('reaches a part that renders a bare slot', () => {
    mount(
      { Root: Popover.Root, Trigger: Popover.Trigger },
      `<Root><Trigger #render="{ props }"><a href="#" v-bind="props" data-testid="t">Open</a></Trigger></Root>`,
    )
    const el = screen.getByTestId('t')
    expect(el.tagName).toBe('A')
    expect(el).toHaveTextContent('Open')
    expect(el).toHaveAttribute('aria-haspopup', 'dialog')
  })

  it('forwards the part state', () => {
    mount(
      { Root: Popover.Root, Trigger: Popover.Trigger },
      `<Root><Trigger #render="{ props, state }"><button v-bind="props">{{ state.open ? 'on' : 'off' }}</button></Trigger></Root>`,
    )
    expect(screen.getByRole('button')).toHaveTextContent('off')
  })

  it('reaches a part whose slot has fallback content', () => {
    mount(
      { Root: Progress.Root, ValueText: Progress.ValueText },
      `<Root :value="40"><ValueText #render="{ props }"><em v-bind="props" data-testid="v">40%</em></ValueText></Root>`,
    )
    expect(screen.getByTestId('v').tagName).toBe('EM')
  })

  it('reaches a part that renders no slot at all', () => {
    mount(
      { Root: Avatar.Root, Image: Avatar.Image },
      `<Root><Image src="x.png" #render="{ props }"><img v-bind="props" data-testid="i" alt="" /></Image></Root>`,
    )
    expect(screen.getByTestId('i')).toBeInTheDocument()
  })

  it('leaves plain children alone when no render slot is given', () => {
    mount({ Root: Popover.Root, Trigger: Popover.Trigger }, `<Root><Trigger>Plain</Trigger></Root>`)
    const btn = screen.getByRole('button')
    expect(btn).toHaveTextContent('Plain')
    expect(btn.tagName).toBe('BUTTON')
  })
})
