'use client'
import { css } from '@/panda/css'
import { Box, Container, HStack, Stack } from '@/panda/jsx'
import { tabs } from '@/panda/recipes'
import {
  Carousel,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
  TabIndicator,
  TabList,
  Tabs,
  TabTrigger,
} from '@ark-ui/react'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { IconButton } from '../shared/IconButton'

export const Showcase = () => {
  const components = ['Dialog', 'Menu', 'Popover', 'Slider', 'Accordion']
  const [index, setIndex] = useState(0)
  return (
    <Container py={{ base: '12', md: '16' }}>
      <Stack direction="column" gap="8" width="full" overflow="hidden">
        <Carousel
          className={css({ width: 'full' })}
          index={index}
          onSlideChange={({ index }) => setIndex(index)}
          slidesPerView={2}
        >
          <CarouselViewport className={css({ overflowX: 'hidden' })}>
            <CarouselSlideGroup>
              {components.map((component, id) => (
                <CarouselSlide key={component} index={id}>
                  <Box
                    background="bg.surface"
                    borderWidth="1px"
                    borderRadius="lg"
                    minH="400px"
                    p="6"
                  >
                    {component} Demo
                  </Box>
                </CarouselSlide>
              ))}
            </CarouselSlideGroup>
          </CarouselViewport>
        </Carousel>

        <Stack direction="row" justify="space-between" width="full">
          <Tabs
            className={tabs({})}
            defaultValue="Dialog"
            onChange={({ value }) => setIndex(components.indexOf(value ?? ''))}
          >
            <TabList>
              {components.map((component) => (
                <TabTrigger key={component} value={component}>
                  <button>{component}</button>
                </TabTrigger>
              ))}
              <TabIndicator />
            </TabList>
          </Tabs>
          <HStack gap="3">
            <IconButton icon={<FiArrowLeft />} aria-label="Previous component" />
            <IconButton icon={<FiArrowRight />} aria-label="Next component" />
          </HStack>
        </Stack>
      </Stack>
    </Container>
  )
}
