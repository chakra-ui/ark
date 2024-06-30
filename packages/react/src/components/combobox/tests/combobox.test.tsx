import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { anatomy } from '@zag-js/combobox'
import { axe } from 'vitest-axe'
import { Combobox } from '../'
import { getExports, getParts } from '../../../setup-test'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'

describe('Combobox / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(anatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Combobox[part]).toBeDefined()
  })
})

describe('Combobox', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should show options on click', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()

    fireEvent.click(screen.getByText('Open'))

    await waitFor(() => expect(screen.getByText('Open')).toHaveAttribute('aria-expanded', 'true'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())
  })

  it('should handle item selection', async () => {
    render(<ComponentUnderTest />)

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('React'))
  })

  it('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(<ComponentUnderTest onValueChange={onValueChange} />)

    // TODO this is strange
    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(<ComponentUnderTest onOpenChange={onOpenChange} />)

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(<ComponentUnderTest readOnly />)

    await user.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.queryByText('React')).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.queryByText('React')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).toBeVisible())
  })

  it('should be able to lazy mount and unmount its items', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Open'))
    expect(await screen.findByTestId('positioner')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})

describe('Combobox / Field', () => {
  afterEach(() => {
    cleanup()
  })

  it('should set combobox as required', async () => {
    render(<WithField required />)
    expect(screen.getByRole('combobox', { name: /label/i })).toBeRequired()
  })

  it('should set combobox as disabled', async () => {
    render(<WithField disabled />)
    expect(screen.getByRole('combobox', { name: /label/i })).toBeDisabled()
  })

  it('should set combobox as readonly', async () => {
    render(<WithField readOnly />)
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(<WithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<WithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on combobox when label is clicked', async () => {
    render(<WithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
