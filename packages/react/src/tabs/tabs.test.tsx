import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Tab } from './tab'
import { TabIndicator } from './tab-indicator'
import { TabList } from './tab-list'
import { TabPanel } from './tab-panel'
import { TabPanels } from './tab-panels'
import { Tabs, TabsProps } from './tabs'

const Component = (props: TabsProps) => (
  <Tabs {...props}>
    <TabList>
      <Tab value="one">Tab 1</Tab>
      <Tab value="two">Tab 2</Tab>
      <Tab value="three">Tab 3</Tab>
      <TabIndicator />
    </TabList>
    <TabPanels>
      <TabPanel value="one">Panel 1</TabPanel>
      <TabPanel value="two">Panel 2</TabPanel>
      <TabPanel value="three">Panel 3</TabPanel>
    </TabPanels>
  </Tabs>
)

describe('Tabs', () => {
  it('should render', async () => {
    render(<Component />)
  })

  it('should show the active panel and hide other panels', async () => {
    render(<Component />)
    const tab1 = screen.getByText('Tab 1')
    const panel1 = screen.getByText('Panel 1')

    const tab2 = screen.getByText('Tab 2')
    const panel2 = screen.getByText('Panel 2')

    await user.click(tab1)
    expect(tab1).toHaveFocus()
    expect(panel1).toBeVisible()
    expect(panel2).not.toBeVisible()

    await user.click(tab2)
    expect(tab2).toHaveFocus()
    expect(panel2).toBeVisible()
    expect(panel1).not.toBeVisible()
  })
})
