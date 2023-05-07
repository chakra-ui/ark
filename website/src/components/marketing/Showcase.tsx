'use client'
import { css, cx } from '@/panda/css'
import { Box, Container, Flex, HStack, Stack } from '@/panda/jsx'
import { tabs } from '@/panda/recipes'
import {
  Carousel,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
  TabIndicator,
  TabList,
  TabTrigger,
  Tabs,
} from '@ark-ui/react'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { DemoAccordion } from '../docs/demo/Accordion'
import { DemoColorPicker } from '../docs/demo/ColorPicker'
import { DemoMenu } from '../docs/demo/Menu'
import { DemoPopover } from '../docs/demo/Popover'
import { DemoSlider } from '../docs/demo/Slider'
import { IconButton } from '../shared/IconButton'

const components = [
  { name: 'Color Picker', demo: <DemoColorPicker /> },
  {
    name: 'Slider',
    demo: <DemoSlider />,
  },
  {
    name: 'Menu',
    demo: <DemoMenu />,
  },
  {
    name: 'Popover',
    demo: <DemoPopover />,
  },
  {
    name: 'Accordion',
    demo: <DemoAccordion />,
  },
] as const

export const Showcase = () => {
  const [index, setIndex] = useState(0)
  return (
    <Container py={{ base: '12', md: '16' }}>
      <Box maxW={{ lg: '4xl' }}>
        <Carousel index={index} onSlideChange={({ index }) => setIndex(index)}>
          <Stack gap="8">
            <CarouselViewport
              className={css({
                background: 'bg.surface',
                borderWidth: '1px',
                borderRadius: 'lg',
                minH: 'md',
                overflowX: 'hidden',
                width: 'full',
              })}
            >
              <CarouselSlideGroup>
                {components.map((component, id) => (
                  <CarouselSlide key={component.name} index={id}>
                    <Flex px="4" py="6" justify="center" align="center">
                      {component.demo}
                    </Flex>
                  </CarouselSlide>
                ))}
              </CarouselSlideGroup>
            </CarouselViewport>
            <Stack direction="row" justify="space-between" width="full">
              <Tabs
                className={cx(
                  tabs({ variant: 'fill' }),
                  css({ display: { base: 'none', sm: 'block' } }),
                )}
                value={components[index].name}
                onChange={({ value }) =>
                  setIndex(components.findIndex((component) => component.name === value))
                }
              >
                <TabList className={css({ display: 'inline-flex' })}>
                  {components.map((component) => (
                    <TabTrigger key={component.name} value={component.name}>
                      <button>{component.name}</button>
                    </TabTrigger>
                  ))}
                  <TabIndicator />
                </TabList>
              </Tabs>
              <HStack gap="3" justify="space-between" flex="1">
                <CarouselPrevSlideTrigger asChild>
                  <IconButton icon={<FiArrowLeft />} aria-label="Previous component" />
                </CarouselPrevSlideTrigger>
                <CarouselNextSlideTrigger asChild>
                  <IconButton icon={<FiArrowRight />} aria-label="Next component" />
                </CarouselNextSlideTrigger>
              </HStack>
            </Stack>
          </Stack>
        </Carousel>
      </Box>
    </Container>
  )
}
