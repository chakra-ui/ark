import { tabsAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { vi } from 'vitest'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './tabs.test.vue'

describe('Tabs', () => {
  it.each(getParts(tabsAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should activate tab on click', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    const tab = screen.getByText('React Trigger')

    await user.click(tab)
    expect(onValueChange).toHaveBeenCalledWith({ value: 'React' })
  })

  it('should not focus disabled tab', async () => {
    render(ComponentUnderTest)

    const disabledTab = screen.getByText('Svelte Trigger')
    const disabledContent = screen.getByText('Svelte Content')

    await user.click(disabledTab)

    expect(disabledTab).not.toHaveFocus()
    expect(disabledContent).not.toBeVisible()
  })

  it('should show content when tab is activated', async () => {
    render(ComponentUnderTest)

    const firstTab = screen.getByText('React Trigger')
    const firstContent = screen.getByText('React Content')

    expect(firstContent).not.toBeVisible()

    await user.click(firstTab)
    expect(firstContent).toBeVisible()
  })

  it('should loop focus by default', async () => {
    render(ComponentUnderTest)

    const firstTab = screen.getByText('React Trigger')
    const lastTab = screen.getByText('Vue Trigger')

    await user.click(lastTab)
    await waitFor(() => expect(lastTab).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(firstTab).toHaveFocus())
  })

  it('should not loop focus if loop is false', async () => {
    render(ComponentUnderTest, { props: { loop: false } })

    const lastTab = screen.getByText('Vue Trigger')

    await user.click(lastTab)
    await waitFor(() => expect(lastTab).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    expect(lastTab).toHaveFocus()
  })

  it('should handle orientation', async () => {
    render(ComponentUnderTest, { props: { orientation: 'vertical' } })

    const firstTab = screen.getByText('React Trigger')
    const secondTab = screen.getByText('Solid Trigger')

    await user.click(firstTab)
    await waitFor(() => expect(firstTab).toHaveFocus())

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(secondTab).toHaveFocus())
  })

  it('should render the content of tab when active', async () => {
    render(ComponentUnderTest, { props: { modelValue: 'React' } })

    expect(screen.getByText('React Content')).toBeVisible()
  })

  it.skip('should lazy mount a tab', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })

    expect(screen.queryByText('React Content')).not.toBeInTheDocument()

    await user.click(screen.getByText('React Trigger'))
    expect(screen.getByText('React Content')).toBeInTheDocument()
  })

  it.skip('should lazy mount and unmount on exit a tab', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })

    expect(screen.queryByText('React Content')).not.toBeInTheDocument()

    await user.click(screen.getByText('React Trigger'))
    expect(screen.queryByText('React Content')).toBeVisible()

    await user.click(screen.getByText('Solid Trigger'))
    expect(screen.queryByText('React Content')).not.toBeInTheDocument()
  })
})
