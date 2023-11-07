import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { For } from 'solid-js'
import { vi } from 'vitest'
import { Tabs, type TabsProps } from './'

const ComponentUnderTest = (props: TabsProps) => {
  const items = [
    { value: 'React' },
    { value: 'Solid' },
    { value: 'Svelte', disabled: true },
    { value: 'Vue' },
  ]
  return (
    <Tabs.Root {...props}>
      <Tabs.List>
        <For each={items}>
          {(item) => (
            <Tabs.Trigger value={item.value} disabled={item.disabled}>
              {item.value} Trigger
            </Tabs.Trigger>
          )}
        </For>
        <Tabs.Indicator />
      </Tabs.List>
      <For each={items}>
        {(item) => <Tabs.Content value={item.value}>{item.value} Content</Tabs.Content>}
      </For>
    </Tabs.Root>
  )
}

describe('Tabs', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
  })

  it('should activate tab on click', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)
    const tab = screen.getByText('React Trigger')

    await user.click(tab)
    expect(onValueChange).toHaveBeenCalledWith({ value: 'React' })
  })

  it('should not focus disabled tab', async () => {
    render(() => <ComponentUnderTest />)
    const disabledTab = screen.getByText('Svelte Trigger')
    const disabledContent = screen.getByText('Svelte Content')

    await user.click(disabledTab)

    expect(disabledTab).not.toHaveFocus()
    expect(disabledContent).not.toBeVisible()
  })

  it('should show content when tab is activated', async () => {
    render(() => <ComponentUnderTest />)

    const firstTab = screen.getByText('React Trigger')
    const firstContent = screen.getByText('React Content')

    expect(firstContent).not.toBeVisible()

    await user.click(firstTab)
    expect(firstContent).toBeVisible()
  })

  it('should loop focus by default', async () => {
    render(() => <ComponentUnderTest />)
    const firstTab = screen.getByText('React Trigger')
    const lastTab = screen.getByText('Vue Trigger')

    await user.click(lastTab)
    await waitFor(() => expect(lastTab).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    await waitFor(() => expect(firstTab).toHaveFocus())
  })

  it('should not loop focus if loop is false', async () => {
    render(() => <ComponentUnderTest loop={false} />)
    const lastTab = screen.getByText('Vue Trigger')

    await user.click(lastTab)
    await waitFor(() => expect(lastTab).toHaveFocus())

    await user.keyboard('[ArrowRight]')
    expect(lastTab).toHaveFocus()
  })

  it('should handle orientation', async () => {
    render(() => <ComponentUnderTest orientation="vertical" />)
    const firstTab = screen.getByText('React Trigger')
    const secondTab = screen.getByText('Solid Trigger')

    await user.click(firstTab)
    await waitFor(() => expect(firstTab).toHaveFocus())

    await user.keyboard('[ArrowDown]')
    await waitFor(() => expect(secondTab).toHaveFocus())
  })

  it('should render the content of tab when active', async () => {
    render(() => <ComponentUnderTest value="React" />)
    expect(screen.getByText('React Content')).toBeVisible()
  })
})
