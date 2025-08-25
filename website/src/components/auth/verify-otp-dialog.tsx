'use client'
import { SendIcon } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Box, Center, Stack, styled } from 'styled-system/jsx'
import { toaster } from '~/components/toaster'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dialog } from '~/components/ui/dialog'
import { Icon } from '~/components/ui/icon'
import { PinInput } from '~/components/ui/pin-input'
import { signIn } from '~/lib/auth-client'

interface Props extends Omit<Dialog.RootProps, 'children'> {
  email: string
  onSuccess: () => void
}

export const VerfiyOtpDialog = (props: Props) => {
  const { email, onSuccess, ...dialogProps } = props
  const [otp, setOtp] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    await signIn
      .emailOtp({
        email,
        otp: otp.join(''),
        fetchOptions: {
          onSuccess,
          onError: ({ error }) => {
            toaster.create({
              title: error.message,
              type: 'error',
            })
          },
        },
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Dialog.Root {...dialogProps}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content boxShadow="none" maxW="fit-content">
          <Card.Root boxShadow="xl">
            <Card.Header textAlign="center">
              <Stack gap="2">
                <Center>
                  <Icon size="lg">
                    <SendIcon />
                  </Icon>
                </Center>
                <Box>
                  <Card.Title>Check your inbox</Card.Title>
                  <Card.Description>
                    We've sent a one-time token to
                    <br /> <styled.span fontWeight="medium">{email}</styled.span>
                  </Card.Description>
                </Box>
              </Stack>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Stack gap="3">
                  <PinInput otp value={otp} length={6} onValueChange={(e) => setOtp(e.value)} />
                  <Button type="submit" width="full" loading={loading}>
                    Submit
                  </Button>
                </Stack>
              </form>
            </Card.Body>
          </Card.Root>
          {/* <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" colorPalette="gray" />
          </Dialog.CloseTrigger> */}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
