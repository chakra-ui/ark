import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { TabContent, TabIndicator, TabList, TabTrigger, Tabs, type TabsProps } from '.'

const Component = (props: TabsProps) => (
  <Tabs {...props}>
    <TabList>
      <TabTrigger value="one">Tab 1</TabTrigger>
      <TabTrigger value="two">Tab 2</TabTrigger>
      <TabTrigger value="three" disabled>
        Tab 3
      </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Content 1</TabContent>
    <TabContent value="two">Content 2</TabContent>
    <TabContent value="three">Content 3</TabContent>
  </Tabs>
)

describe('Tabs', () => {
  it('should render', async () => {
    render(<Component />)
  })

  it('should render the content of tabe one by default', async () => {
    render(<Component defaultValue="one" />)
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('should show the active panel and hide other panels', async () => {
    render(<Component />)

    await user.click(screen.getByRole('tab', { name: 'Tab 1' }))
    expect(screen.getByText('Content 1')).toBeVisible()

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByText('Content 2')).toBeVisible()
    expect(screen.getByText('Content 1')).not.toBeVisible()
  })

  it('should show the active panel and hide other panels', async () => {
    render(<Component />)
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    const tab3 = screen.getByRole('tab', { name: 'Tab 3' }) // disabled tab

    tab1.focus()
    expect(tab1).toHaveFocus()

    await user.keyboard('[ArrowRight]')
    expect(tab2).toHaveFocus()

    await user.keyboard('[ArrowRight]')
    // skip disabled tab, loop to next element
    expect(tab3).not.toHaveFocus()
    expect(tab1).toHaveFocus()
  })
})
