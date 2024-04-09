import { Box, Center } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import * as Collapsible from '~/components/ui/collapsible'

export const Demo = (props: Collapsible.RootProps) => {
  return (
    <Box w="full" h="40">
      <Collapsible.Root defaultOpen {...props}>
        <Collapsible.Trigger asChild>
          <Button variant="outline">Toggle</Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Center bg="accent.default" color="accent.fg" p="10" borderRadius="l3" mt="3">
            Content
          </Center>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  )
}
