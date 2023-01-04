import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { Stack } from '@/panda/jsx'

type Property = {
  name: string
  type: string
  isRequired: boolean
  defaultValue?: string
  description?: string
}

type ComponentAPIReferenceProps = {
  properties: Property[]
}

export const ComponentAPIReference = (props: ComponentAPIReferenceProps) => {
  const { properties } = props

  return (
    <Stack gap="10">
      <Stack gap="4">
        <Heading textStyle="2xl" fontWeight="semibold">
          Properties
        </Heading>
        <Text color="fg.muted" lineHeight="relaxed">
          {/* TODO update text */}
          API reference docs for the React Button component. Learn about the props, CSS, and other
          APIs of this exported module.
        </Text>
      </Stack>
      <table>
        <thead>
          <tr>
            {['Name', 'Type', 'Default', 'Description'].map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.name}>
              <td>
                {property.name}
                <RequiredIndicator isRequired={property.isRequired} />
              </td>
              <td>{property.type}</td>
              <td>{property.defaultValue}</td>
              <td>{property.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stack>
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
