import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '.'
import './tabs.css'

const meta: Meta = {
  title: 'Tabs',
}

export default meta

export const Basic = () => (
  <Tabs>
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
    </TabList>
    <TabContent value="react">React Content</TabContent>
    <TabContent value="vue">Vue Content</TabContent>
    <TabContent value="solid">Solid Content</TabContent>
  </Tabs>
)

export const InitialTab = () => (
  <Tabs value="react">
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
    </TabList>
    <TabContent value="react">React Content</TabContent>
    <TabContent value="vue">Vue Content</TabContent>
    <TabContent value="solid">Solid Content</TabContent>
  </Tabs>
)

export const Indicator = () => (
  <Tabs>
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="react">React Content</TabContent>
    <TabContent value="vue">Vue Content</TabContent>
    <TabContent value="solid">Solid Content</TabContent>
  </Tabs>
)

export const DisabledTab = () => (
  <Tabs value="react">
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="vue" disabled>
        Vue
      </TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
    </TabList>
    <TabContent value="react">React Content</TabContent>
    <TabContent value="vue">Vue Content</TabContent>
    <TabContent value="solid">Solid Content</TabContent>
  </Tabs>
)

export const Controlled = () => {
  const [value, setValue] = createSignal<string | null>('react')
  return (
    <Tabs value={value()} onChange={(e) => setValue(e.value)}>
      <TabList>
        <TabTrigger value="react">React</TabTrigger>
        <TabTrigger value="vue">Vue</TabTrigger>
        <TabTrigger value="solid">Solid</TabTrigger>
      </TabList>
      <TabContent value="react">React Content</TabContent>
      <TabContent value="vue">Vue Content</TabContent>
      <TabContent value="solid">Solid Content</TabContent>
    </Tabs>
  )
}

export const Vertical = () => (
  <Tabs orientation="vertical" value="react">
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
    </TabList>
    <TabContent value="react">React Content</TabContent>
    <TabContent value="vue">Vue Content</TabContent>
    <TabContent value="solid">Solid Content</TabContent>
  </Tabs>
)

export const Manual = () => (
  <Tabs activationMode="manual" value="react">
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
    </TabList>
    <TabContent value="react">React Content</TabContent>
    <TabContent value="vue">Vue Content</TabContent>
    <TabContent value="solid">Solid Content</TabContent>
  </Tabs>
)
