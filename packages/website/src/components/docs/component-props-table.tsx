import { Portal } from '@ark-ui/react'
import type { CollectionEntry } from 'astro:content'
import { AsteriskIcon, HelpCircle, MinusIcon } from 'lucide-react'
import { HStack, Stack } from 'styled-system/jsx'
import { Button, Code, Heading, Icon, Popover, Table } from '~/components/ui'

type Props = {
  types: CollectionEntry<'types'>
}

export const ComponentPropsTable = (props: Props) => {
  const { types } = props

  return (
    <Stack gap="6" className="not-prose">
      {Object.entries(types.data).map(([key, properties]) => (
        <Stack key={key} gap="4" className="not-prose">
          <Heading textStyle="xl" fontWeight="semibold" color="fg.default">
            {key}
          </Heading>
          <Stack overflowX="auto">
            <Table.Root variant="outline" size="sm">
              <Table.Head>
                <Table.Row>
                  <Table.Header>Prop</Table.Header>
                  <Table.Header>Type</Table.Header>
                  <Table.Header>Default</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {Object.entries(properties).map(([name, property]) => (
                  <Table.Row key={name}>
                    <Table.Cell width="40">
                      <HStack>
                        <Code size="sm" color="accent.default">
                          {name}
                          {property.isRequired && <AsteriskIcon size="10" />}
                        </Code>
                        {property.description && (
                          <Popover.Root portalled>
                            <Popover.Trigger asChild>
                              <Button size="xs" px="0" variant="link" color="fg.subtle">
                                <HelpCircle />
                              </Button>
                            </Popover.Trigger>
                            <Portal>
                              <Popover.Positioner>
                                <Popover.Content>
                                  <Popover.Description>{property.description}</Popover.Description>
                                </Popover.Content>
                              </Popover.Positioner>
                            </Portal>
                          </Popover.Root>
                        )}
                      </HStack>
                    </Table.Cell>
                    <Table.Cell height="auto">
                      <Code size="sm">{property.type}</Code>
                    </Table.Cell>
                    <Table.Cell width="12" textAlign="center">
                      {property.defaultValue ? (
                        <Code size="sm">{property.defaultValue}</Code>
                      ) : (
                        <Icon size="xs" color="fg.muted">
                          <MinusIcon />
                        </Icon>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
