import type { Metadata } from 'next'
import { Box, Container, Stack } from 'styled-system/jsx'
import { findLicenseKeysByOrderId } from '~/app/actions'
import { PageHeader } from '~/components/page-header'
import { ActivationForm } from '~/components/plus/activation-form'
import { auth } from '~/lib/auth'

interface Props {
  searchParams: {
    orderId: string
  }
}

export default async function Page(props: Props) {
  const licenseKeys = await findLicenseKeysByOrderId(props.searchParams.orderId)
  const session = await auth()
  const authenticated = session !== null

  if (!licenseKeys) {
    return <div>Order not found</div>
  }

  return (
    <Container py="12" maxW="7xl">
      <Stack gap={{ base: '8', md: '12' }}>
        <PageHeader
          heading="Thank you!"
          subHeading="Ark UI Plus"
          description="We're thrilled to have you on board. Below you'll find your license key, which will give
          you access to all the examples."
        />
        <Box maxW="lg" mx="auto" width="full">
          <ActivationForm authenticated={authenticated} licenseKey={licenseKeys[0]} />
        </Box>
      </Stack>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Thank you',
}
