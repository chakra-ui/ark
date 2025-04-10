import type { Metadata } from 'next'
import { Box, Container, Stack } from 'styled-system/jsx'
import { findLicenseKeysByOrderId } from '~/app/actions'
import { PageHeader } from '~/components/page-header'
import { ActivationForm } from '~/components/plus/activation-form'
import { auth } from '~/lib/auth'

interface Props {
  searchParams: Promise<{ orderId: string }>
}

export default async function Page(props: Props) {
  const { orderId } = await props.searchParams
  const licenseKey = await findLicenseKeysByOrderId(orderId)
  const session = await auth()
  const authenticated = session !== null

  return (
    <Container py="12" maxW="7xl">
      <Stack gap={{ base: '8', md: '12' }}>
        {licenseKey ? (
          <PageHeader
            heading="Welcome aboard!"
            subHeading="Activation"
            description="Your license key is ready! Activate it or share with someone to unlock full access to all examples."
          />
        ) : (
          <PageHeader
            heading="Activate Your License"
            subHeading="License Activation"
            description="Enter your license key below to unlock access to all examples. If you don't have one, check your order confirmation."
          />
        )}

        <Box maxW="lg" mx="auto" width="full">
          <ActivationForm authenticated={authenticated} licenseKey={licenseKey} />
        </Box>
      </Stack>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Thank you',
}
