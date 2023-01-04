import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { Stack } from '@/panda/jsx'
import type { ReactNode } from 'react'

type Property = {
  type: string
  isRequired: boolean
  defaultValue?: string
  description?: string
}

type ComponentAPIReferenceProps = {
  componentName: ReactNode
  types: Record<string, Record<string, Property>>
}

export const ComponentAPIReference = (props: ComponentAPIReferenceProps) => {
  const { componentName, types } = props

  return (
    <Stack gap="10">
      <Stack gap="4">
        <Heading textStyle="2xl" fontWeight="semibold">
          Properties
        </Heading>
        {/*@ts-ignore wrong typings*/}
        <Text color="fg.muted" lineHeight="relaxed">
          {/* TODO update text */}
          API reference docs for the {componentName} component. Learn about the props, CSS, and
          other APIs of this exported module.
        </Text>
      </Stack>
      <Stack gap="4">
        {Object.entries(types).map(([name, properties]) => (
          <Stack key={name} gap="4">
            <Heading textStyle="xl" fontWeight="semibold">
              {name}
            </Heading>
            <Properties properties={properties} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

type PropertiesProps = {
  properties: Record<string, Property>
}

const Properties = (props: PropertiesProps) => {
  const { properties } = props

  return (
    <table>
      <thead>
        <tr>
          {['Name', 'Type', 'Default', 'Description'].map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(properties).map(([name, property]) => (
          <tr key={name}>
            <td>
              {name}
              <RequiredIndicator isRequired={property.isRequired} />
            </td>
            <td>{property.type}</td>
            <td>{property.defaultValue}</td>
            <td>{property.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const RequiredIndicator = (props: { isRequired: boolean }) => {
  const { isRequired } = props

  if (!isRequired) {
    return null
  }

  return (
    <Text as="span" color="fg.muted" textStyle="xs" userSelect="none" ps="1">
      required
    </Text>
  )
}
