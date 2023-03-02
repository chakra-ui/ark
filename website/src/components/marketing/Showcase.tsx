'use client'
import { Box, Container, HStack, Stack } from '@/panda/jsx'
import { tabs } from '@/panda/recipes'
import { TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { IconButton } from '../shared/IconButton'

export const Showcase = () => (
  <Container>
    <Stack direction="row" gap="8" width="full" overflow="hidden">
      <Stack gap="8" width="full" maxW="3xl">
        <Box
          bg="gray.100"
          _dark={{ background: 'brown.600' }}
          borderWidth="1px"
          borderRadius="lg"
          minH="400px"
          width="full"
          maxW="3xl"
        />
        <Stack direction="row" justify="space-between" width="full">
          <Tabs className={tabs({})} defaultValue="Dialog">
            <TabList>
              {['Dialog', 'Menu', 'Popover', 'Slider', 'Accordion'].map((value) => (
                <TabTrigger key={value} value={value}>
                  <button>{value}</button>
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
      <Box
        bg="gray.100"
        _dark={{ background: 'brown.600' }}
        borderWidth="1px"
        borderRadius="lg"
        minH="400px"
        flex="1"
      />
    </Stack>
  </Container>
)
