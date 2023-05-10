import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  type PopoverProps,
} from './'

const ComponentUnderTest = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>click me</PopoverTrigger>
    <PopoverPositioner>
      <PopoverArrow>
        <PopoverArrowTip />
      </PopoverArrow>
      <PopoverContent>
        <PopoverTitle>title</PopoverTitle>
        <PopoverDescription>description</PopoverDescription>
        <PopoverCloseTrigger>close</PopoverCloseTrigger>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)

describe('Popover', () => {
  it('should open and close the popover', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByText('close'))
    expect(screen.queryByText('title')).not.toBeVisible()
  })

  it('should hide the tooltip when escape is pressed', async () => {
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
      const [isOpen, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen((prev) => !prev)}>toggle</button>
          <ComponentUnderTest {...props} isOpen={isOpen} />
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
