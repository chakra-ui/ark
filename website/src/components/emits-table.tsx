import { Box, Stack } from 'styled-system/jsx'
import { Code } from '~/components/ui/code'
import { Table } from '~/components/ui/table'
import { Text } from '~/components/ui/text'

interface Props {
  emits:
    | Record<
        string,
        {
          type: string
          isRequired: boolean
          defaultValue?: string | undefined
          description?: string | undefined
        }
      >
    | undefined
  columns?: [string, string]
}

export const EmitsTable = (props: Props) => {
  const { emits, columns = ['Emit', 'Event'] } = props
  if (!emits) {
    return null
  }
  return (
    <Box borderRadius="lg" overflowX="auto" className="not-prose" my="8">
      <Table.Root variant="outline" size="sm" border={0}>
        <Table.Head>
          <Table.Row>
            <Table.Header px="4" h="10">
              {columns[0]}
            </Table.Header>
            <Table.Header px="4" h="10">
              {columns[1]}
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Object.entries(emits).map(([name, property]) => (
            <Table.Row key={name}>
              <Table.Cell width="36" px="4" py="2.5" verticalAlign="top">
                <Code size="sm" variant="ghost" fontWeight="semibold!">
                  {name}
                </Code>
              </Table.Cell>
              <Table.Cell px="4" py="2.5" verticalAlign="top">
                <Stack gap="1" align="start">
                  <Code size="sm" variant="ghost">
                    {property.type}
                  </Code>
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
