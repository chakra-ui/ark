'use client'
import { Container } from 'panda/jsx/container'
import { TabContent, TabIndicator, TabList, TabTrigger, Tabs } from '../ui/tabs'

export const Examples = () => {
  return (
    <Container pb={{ base: '16', md: '24' }} pt="16">
      <Tabs defaultValue="accordion">
        <TabList>
          <TabTrigger value="accordion">Accordion</TabTrigger>
          <TabTrigger value="dialog">Dialog</TabTrigger>
          <TabTrigger value="range-slider">Range Slider</TabTrigger>
          <TabIndicator />
        </TabList>
        <TabContent value="accordion">Accordion</TabContent>
        <TabContent value="dialog">Dialog</TabContent>
        <TabContent value="range-slider">Range Slider</TabContent>
      </Tabs>
    </Container>
  )
}
