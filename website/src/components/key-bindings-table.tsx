import { type AccessibilityDocKey, getAccessibilityDoc } from '@zag-js/docs'
import { Box } from 'styled-system/jsx'
import { Kbd, Table } from './ui'

interface Props {
  id: AccessibilityDocKey
}

export const KeyBindingsTable = (props: Props) => {
  const { keyboard } = getAccessibilityDoc(props.id)

  return (
    <Box borderWidth="1px" borderRadius="lg" overflowX="auto" className="not-prose">
      <Table.Root variant="outline" size="sm" border="none">
        <Table.Head>
          <Table.Row>
            <Table.Header px="4" bg="gray.2" h="10">
              Key
            </Table.Header>
            <Table.Header px="4" bg="gray.2" h="10">
              Description
            </Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {keyboard.map((item, id) => (
            <Table.Row key={id}>
              <Table.Cell px="4" py="2">
                <Kbd color="gray.a11">{item.keys.map((key) => key)}</Kbd>
              </Table.Cell>
              <Table.Cell px="4" py="2" dangerouslySetInnerHTML={{ __html: item.description }} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
