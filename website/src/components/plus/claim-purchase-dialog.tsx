'use client'
import { Portal } from '@ark-ui/react/portal'
import { PartyPopperIcon, XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toaster } from '~/components/toaster'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dialog } from '~/components/ui/dialog'
import { Icon } from '~/components/ui/icon'
import { authClient, useSession } from '~/lib/auth-client'
import { SignInButton } from '../auth/sign-in-button'
import { IconButton } from '../ui/icon-button'

export const ClaimPurchaseDialog = () => {
  const [open, setOpen] = useState(false)
  const [orderId, setOrderId] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: session } = useSession()

  useEffect(() => {
    const orderId = searchParams.get('claim')
    console.log('orderId', orderId)
    if (orderId) {
      setOpen(true)
      setOrderId(orderId)
    }
  }, [searchParams])

  const handleClaim = async () => {
    setLoading(true)
    try {
      const { data } = await authClient.purchase.claim({ orderId })

      if (data?.success) {
        toaster.create({
          title: 'Purchase claimed successfully!',
          type: 'success',
        })
        router.push('/blocks')
      } else {
        toaster.create({
          title: data?.message || 'An unexpected error occurred',
          type: 'error',
        })
      }
    } catch {
      toaster.create({ title: 'An unexpected error occurred', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)} closeOnInteractOutside={false}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content boxShadow="none" height="fit-content" maxW="sm">
            <Card.Root boxShadow="xl">
              <Card.Header pb="2">
                <Icon size="lg">
                  <PartyPopperIcon />
                </Icon>
              </Card.Header>
              <Card.Body gap="1" py="4">
                <Card.Title>Claim your purchase</Card.Title>
                <Card.Description>
                  Thank you for your purchase. Click below to access your Ark UI Plus Examples source files.
                </Card.Description>
                <Card.Description>You can also share this link to let someone else claim it instead.</Card.Description>
              </Card.Body>
              <Card.Footer gap="3">
                <Button variant="outline" flex="1" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                {session ? (
                  <Button flex="1" loading={loading} onClick={handleClaim}>
                    Claim
                  </Button>
                ) : (
                  <SignInButton flex="1">Sign In to Claim</SignInButton>
                )}
              </Card.Footer>
            </Card.Root>
            <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
              <IconButton aria-label="Close Dialog" variant="ghost" size="sm">
                <XIcon />
              </IconButton>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
