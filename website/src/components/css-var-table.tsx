import { getCssVarDoc, type CssVarDocKey } from '@zag-js/docs'
import { Effect, pipe } from 'effect'
import { Box } from 'styled-system/jsx'
import { Code } from '~/components/ui/code'
import { Table } from '~/components/ui/table'

interface Props {
  component: string
  part: string
  replace?: Record<string, string>
}

export const CssVarTable = (props: Props) => {
  const { component, part, replace } = props

  const replaceFn = (value: string) => {
    if (!replace) return value
    return Object.entries(replace).reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(key, 'g'), value)
    }, value)
  }

  const properties = Effect.runSync(
    pipe(
      Effect.try(() => getCssVarDoc(component as CssVarDocKey)[part]),
      Effect.catchAll(() => Effect.succeed(null)),
    ),
  )

  if (!properties) {
    return null
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflowX="auto" className="not-prose" my="8">
      <Table.Root variant="outline" size="sm" border={0}>
        <Table.Head>
          <Table.Row>
            <Table.Header px="4" bg="gray.2" h="10">
              CSS Variable
            </Table.Header>
            <Table.Header px="4" bg="gray.2" h="10">
              Description
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Object.entries(properties).map(([key, value]) => (
            <Table.Row key={key}>
              <Table.Cell px="4" py="2" verticalAlign="top">
                <Code size="sm" color="colorPalette.default">
                  {key}
                </Code>
              </Table.Cell>
              <Table.Cell px="4" py="2" verticalAlign="top">
                {replaceFn(String(value))}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
