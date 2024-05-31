'use client'
import { useFormState } from 'react-dom'
import { Stack } from 'styled-system/jsx'
import { activateLicense } from '~/app/actions'
import { Button, Input } from '~/components/ui'

interface Props {
  licenseKey: string
}

export const ActivationForm = (props: Props) => {
  const { licenseKey } = props
  const [state, formAction] = useFormState(activateLicense, { message: '', success: false })

  return (
    <form action={formAction}>
      <Stack gap={{ base: '8', md: '10' }}>
        <Input name="licenseKey" value={licenseKey} size="xl" />
        <Stack direction="row" gap="3">
          <Button variant="outline" size="xl">
            Share
          </Button>
          <Button type="submit" size="xl">
            Activate license
          </Button>
        </Stack>
      </Stack>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
