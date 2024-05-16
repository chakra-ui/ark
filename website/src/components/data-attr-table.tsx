import { type DataAttrKey, getDataAttrDoc } from '@zag-js/docs'
import { Effect, pipe } from 'effect'
import { Box } from 'styled-system/jsx'
import { Code, Table } from './ui'

interface Props {
  component: string
  part: string
}

export const DataAttrTable = (props: Props) => {
  const { component, part } = props

  const properties = Effect.runSync(
    pipe(
      Effect.try(() => getDataAttrDoc(component as DataAttrKey)[part]),
      Effect.catchAll(() => Effect.succeed(null)),
    ),
  )
  if (!properties) {
    return null
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflowX="auto" className="not-prose" my="8">
      <Table.Root variant="outline" size="sm" border="none">
        <Table.Head>
          <Table.Row>
            <Table.Header px="4" bg="gray.2" h="10">
              Data Attribute
            </Table.Header>
            <Table.Header px="4" bg="gray.2" h="10">
              Value
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Object.entries(properties).map(([key, value]) => (
            <Table.Row key={key}>
              <Table.Cell px="4" py="2">
                <Code size="sm" color="accent.default">
                  [{key}]
                </Code>
              </Table.Cell>
              <Table.Cell px="4" py="2">
                {/* @ts-expect-error Incorrectly typed */}
                {value}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
