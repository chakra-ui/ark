import { Box, Container, Stack } from '@/panda/jsx'
import { FiArrowRight } from 'react-icons/fi'
import { Button } from '../shared/Button'
import { Heading } from '../shared/Heading'
import { Text } from '../shared/Text'

export const Enterprise = () => (
  <Container py={{ base: '12', md: '24' }}>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      p="16"
      gap="16"
      background="bg.surface"
      borderWidth="1px"
      borderRadius="2xl"
      alignItems="center"
    >
      <Stack gap="8" flex="1">
        <Stack gap="4">
          <Heading textStyle={{ base: '2xl', md: '3xl' }} fontWeight="semibold">
            Carefully designed for product and enterprise teams
          </Heading>
          <Text color="fg.muted" textStyle="xl">
            Ark UI is a bundle of headless UI components
          </Text>
        </Stack>
        <Button
          href="/docs/react/overview/"
          variant="link"
          size="lg"
          color="orange.400"
          rightIcon={<FiArrowRight />}
        >
          Get started
        </Button>
      </Stack>
      <Stack direction="row" gap="6" flex="1" justify="center">
        {['React', 'Vue', 'Solid', 'Ark'].map((name) => (
          <Box key={name} bg="orange.400" borderRadius="full" width="24" height="24" />
        ))}
      </Stack>
    </Stack>
  </Container>
)
