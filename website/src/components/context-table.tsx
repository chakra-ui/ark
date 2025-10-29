import { MinusIcon } from 'lucide-react'
import { Box, Stack } from 'styled-system/jsx'
import { Code } from '~/components/ui/code'
import { Icon } from '~/components/ui/icon'
import { Table } from '~/components/ui/table'
import { Text } from '~/components/ui/text'

interface Props {
  context: Record<
    string,
    {
      type: string
      description: string
      defaultValue?: string | undefined
    }
  >
}

export const ContextTable = (props: Props) => {
  const { context } = props

  return (
    <Box borderWidth="1px" borderRadius="lg" overflowX="auto" className="not-prose" my="8">
      <Table.Root variant="outline" size="sm" border={0}>
        <Table.Head>
          <Table.Row>
            <Table.Header px="4" bg="gray.2" h="10">
              Property
            </Table.Header>
            <Table.Header px="4" bg="gray.2" h="10">
              Default
            </Table.Header>
            <Table.Header px="4" bg="gray.2" h="10">
              Type
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Object.entries(context).map(([name, property]) => (
            <Table.Row key={name}>
              <Table.Cell width="36" px="4" py="2" verticalAlign="top">
                <Code size="sm" color="colorPalette.default">
                  {name}
                </Code>
              </Table.Cell>
              <Table.Cell width="28" px="4" py="2" verticalAlign="top">
                {property.defaultValue ? (
                  <Code size="sm">{property.defaultValue.replaceAll('"', "'")}</Code>
                ) : (
                  <Icon size="xs" color="fg.muted">
                    <MinusIcon />
                  </Icon>
                )}
              </Table.Cell>
              <Table.Cell px="4" py="2" verticalAlign="top">
                <Stack gap="1" align="start">
                  <Code size="sm">{property.type}</Code>
                  <Text>{property.description}</Text>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
