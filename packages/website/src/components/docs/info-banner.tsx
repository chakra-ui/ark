import { InfoIcon } from 'lucide-react'
import type { PropsWithChildren, ReactNode } from 'react'
import { Alert } from '~/components/ui'

interface Props {
  title?: string
  description: ReactNode
}

export const InfoBanner = (props: PropsWithChildren<Props>) => {
  const { title = 'Info', description, children } = props
  return (
    <Alert.Root className="not-prose" mb="6">
      <Alert.Icon asChild>
        <InfoIcon />
      </Alert.Icon>
      <Alert.Content textStyle="sm!">
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description asChild>{<p>{description}</p> ?? children}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
