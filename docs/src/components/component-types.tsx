import { MinusIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Stack } from 'styled-system/jsx'
import { Code, Heading, Icon, Table, Text } from '~/components/ui'
import { getServerContext } from '~/lib/server-context'
import { types } from '.velite'

interface Props {
  id: string
}

export const ComponentTypes = (props: Props) => {
  const serverContext = getServerContext()
  const api = types.find(
    (type) => type.component === props.id && type.framework === serverContext.framework,
  )

  if (!api) {
    return null
  }

  return Object.entries(api.parts)
    .sort(([key]) => (key === 'Root' ? -1 : 1))
    .map(([key, properties]) => (
      <Fragment key={key}>
        <Heading as="h3">{key}</Heading>
        <Stack overflowX="auto" className="not-prose">
          <Table.Root variant="outline" size="sm" borderRadius="xl">
            <Table.Head>
              <Table.Row>
                <Table.Header px="4">Prop</Table.Header>
                <Table.Header px="4">Default</Table.Header>
                <Table.Header px="4">Type</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {Object.entries(properties).map(([name, property]) => (
                <Table.Row key={name}>
                  <Table.Cell width="36" px="4" py="2" verticalAlign="top">
                    <Code size="sm" color="#EB5E41">
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
        </Stack>
      </Fragment>
    ))
}
