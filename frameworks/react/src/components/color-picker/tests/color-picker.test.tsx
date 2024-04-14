import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { ColorPicker } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('ColorPicker / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(colorPickerAnatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(colorPickerAnatomy))('should export %s', async (part) => {
    expect(ColorPicker[part]).toBeDefined()
  })
})

describe('ColorPicker', () => {
  afterEach(() => {
    cleanup()
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  }, 7000)

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  }, 7000)
})
