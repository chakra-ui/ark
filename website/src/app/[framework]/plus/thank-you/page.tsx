import type { Metadata } from 'next'
import { Container, Stack } from 'styled-system/jsx'
import { findLicenseKeysByOrderId } from '~/app/actions'
import { PageHeader } from '~/components/page-header'
import { ActivationForm } from '~/components/plus/activation-form'

interface Props {
  searchParams: {
    orderId: string
  }
}

export default async function Page(props: Props) {
  const licenseKeys = await findLicenseKeysByOrderId(props.searchParams.orderId)

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
        <ActivationForm licenseKey={licenseKeys[0]} />
      </Stack>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Thank you',
}
