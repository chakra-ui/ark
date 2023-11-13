import { InfoIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { Alert } from '~/components/ui'

interface Props {
  title?: string
  description?: string
}

export const InfoBanner = (props: PropsWithChildren<Props>) => {
  const { title = 'Info', children, description } = props
  return (
    <Alert.Root className="not-prose" mb="6">
      <Alert.Icon asChild>
        <InfoIcon />
      </Alert.Icon>
      <Alert.Content textStyle="sm!">
        <Alert.Title>{title}</Alert.Title>
        {description ? (
          <Alert.Description>{description}</Alert.Description>
        ) : (
          <Alert.Description asChild>{children}</Alert.Description>
        )}
      </Alert.Content>
    </Alert.Root>
  )
}
