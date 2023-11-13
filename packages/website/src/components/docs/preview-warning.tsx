import { InfoIcon } from 'lucide-react'
import { Alert } from '~/components/ui'

export const PreviewWarning = () => {
  return (
    <Alert.Root className="not-prose" mb="6">
      <Alert.Icon asChild>
        <InfoIcon />
      </Alert.Icon>
      <Alert.Content>
        <Alert.Title>Preview Component</Alert.Title>
        <Alert.Description>
          The API for this component is not stable yet and may change in the future.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
