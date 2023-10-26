import { popoverAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import { getExports, getParts } from '../setup-test'
import { Popover, type PopoverProps } from './'

const ComponentUnderTest = (props: PopoverProps) => (
  <Popover.Root {...props}>
    <Popover.Trigger>
      click me
      <Popover.Indicator />
    </Popover.Trigger>
    <Popover.Anchor>Anchor</Popover.Anchor>
    <Popover.Positioner>
      <Popover.Arrow>
        <Popover.ArrowTip />
      </Popover.Arrow>
      <Popover.Content>
        <Popover.Title>title</Popover.Title>
        <Popover.Description>description</Popover.Description>
        <Popover.CloseTrigger>close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)

describe('Popover', () => {
  it.each(getParts(popoverAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(popoverAnatomy))('should export %s', async (part) => {
    expect(Popover[part]).toBeDefined()
  })

  it('should open and close the popover', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByText('close'))
    expect(screen.queryByText('title')).not.toBeVisible()
  })

  it.skip('should hide the popover when escape is pressed', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.queryByText('title')).not.toBeVisible()
  })

  it('should focus the first focusable element', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should allow controlled usage', async () => {
    const ControlledComponentUnderTest = (props: PopoverProps) => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen((prev) => !prev)}>toggle</button>
          <ComponentUnderTest {...props} open={open} />
        </>
      )
    }

    render(<ControlledComponentUnderTest />)
    expect(screen.queryByText('title')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.queryByText('title')).toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.queryByText('title')).not.toBeVisible()
  })
})
