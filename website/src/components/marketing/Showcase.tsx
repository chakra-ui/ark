'use client'
import { css, cx } from '@/panda/css'
import { Box, Container, HStack, Stack } from '@/panda/jsx'
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
import { DemoSplitter } from '../docs/demo/Splitter'
import { IconButton } from '../shared/IconButton'

export const Showcase = () => {
  const components = ['Dialog', 'Menu', 'Popover', 'Slider', 'Accordion']
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
                  <CarouselSlide key={component} index={id}>
                    <Box px="4" py="6">
                      <DemoSplitter />
                    </Box>
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
                value={components[index]}
                onChange={({ value }) => setIndex(components.indexOf(value ?? ''))}
              >
                <TabList className={css({ display: 'inline-flex' })}>
                  {components.map((component) => (
                    <TabTrigger key={component} value={component}>
                      <button>{component}</button>
                    </TabTrigger>
                  ))}
                  <TabIndicator />
                </TabList>
              </Tabs>
              <HStack gap="3" justify="space-between" flex="1">
                <CarouselPrevSlideTrigger>
                  <IconButton icon={<FiArrowLeft />} aria-label="Previous component" />
                </CarouselPrevSlideTrigger>
                <CarouselNextSlideTrigger>
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
