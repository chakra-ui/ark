import { render, screen, waitFor, cleanup } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Controlled, Provider } from './fixtures.tsx'

afterEach(cleanup)

const defaults = { defaultValue: 12.5, locale: 'en-US', spinTiming: { duration: '1ms' } }

describe('Number Flow', () => {
  it('renders one accessible formatted value and hides decorative tracks', async () => {
    const { container } = render(() => <Provider {...defaults} />)
    expect(screen.getByRole('img', { name: '12.5' })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-number-flow-digit]')).toHaveLength(3)
    expect(container.querySelector('[data-number-flow-digit-track]')).toHaveAttribute('aria-hidden', 'true')
    expect(await axe(container)).toHaveNoViolations()
  })

  it('renders a span root with a track and cells for each digit by default', () => {
    const { container } = render(() => <Provider {...defaults} />)
    const root = container.querySelector('[data-number-flow-root]')
    expect(root?.tagName).toBe('SPAN')
    const tracks = container.querySelectorAll('[data-number-flow-digit] > [data-number-flow-digit-track]')
    expect(tracks).toHaveLength(3)
    expect(tracks[0].querySelectorAll('[data-number-flow-digit-cell]').length).toBeGreaterThanOrEqual(10)
    expect(container.querySelector('[data-number-flow-symbol]')).toHaveTextContent('.')
  })

  it('formats currency and static affixes', () => {
    render(() => (
      <Provider
        {...{ ...defaults, prefix: 'Balance: ', suffix: ' USD', formatOptions: { style: 'currency', currency: 'USD' } }}
      />
    ))
    expect(screen.getByRole('img', { name: 'Balance: $12.50 USD' })).toBeInTheDocument()
  })

  it('updates controlled values when the digit count changes', async () => {
    render(() => <Controlled />)
    expect(screen.getByRole('img', { name: '99' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Update' }))
    await waitFor(() => expect(screen.getByRole('img', { name: '1,000' })).toBeInTheDocument())
    expect(document.querySelectorAll('[data-number-flow-digit]')).toHaveLength(4)
  })

  it('updates an uncontrolled value through the provider API', async () => {
    const onValueChange = vi.fn()
    render(() => <Provider {...{ ...defaults, onValueChange }} />)
    await user.click(screen.getByRole('button', { name: 'Update' }))
    await waitFor(() => expect(screen.getByRole('img', { name: '13.5' })).toBeInTheDocument())
    expect(onValueChange).toHaveBeenCalledWith({ value: 13.5 })
  })

  it('announces live values after the animation settles', async () => {
    render(() => <Provider {...{ ...defaults, live: true }} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('12.5'))
    await user.click(screen.getByRole('button', { name: 'Update' }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('13.5'))
  })
})
