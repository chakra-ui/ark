import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { TabContent, TabIndicator, TabList, TabTrigger, Tabs, type TabsProps } from '.'

const Component = (props: TabsProps) => (
  <Tabs {...props}>
    <TabList>
      <TabTrigger value="one">Tab 1</TabTrigger>
      <TabTrigger value="two" disabled>
        Tab 2
      </TabTrigger>
      <TabTrigger value="three">Tab 3</TabTrigger>
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

  it('should show the active panel and hide other panels', async () => {
    render(<Component />)
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    await user.click(tab2)
    // TODO fix me
    // expect(screen.getByText('Content 2')).toBeVisible()

    // const tab1 = screen.getByText('Tab 1')
    // const content1 = screen.getByText('Content 1')

    // const tab2 = screen.getByRole('Tab 2')
    // const content2 = screen.getByText('Content 2')

    // await user.click(tab1)
    // expect(content1).toBeVisible()
    // expect(content2).not.toBeVisible()

    // await user.click(tab2)
    // screen.debug()
    // expect(content2).toBeVisible()
    // expect(content1).not.toBeVisible()
  })

  it('should show content of the default value', async () => {
    render(<Component defaultValue="two" />)
    expect(screen.getByText('Content 2')).toBeVisible()
  })
})
