export interface UserWithLicenses {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
  licenseKeys: Array<{
    id: string
    key: string
    disabled: boolean
    type: 'Personal' | 'Team'
    orderItem?: {
      id: string
      productName: string
      order: {
        id: string
        externalId: string
        refunded: boolean
        provider: 'LemonSqueezy'
        createdAt: Date
      }
    } | null
  }>
}

export interface UserWithLicenseDetails {
  user: {
    id: string
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
  }
  licenses: Array<{
    id: string
    key: string
    disabled: boolean
    type: 'Personal' | 'Team'
    order: {
      id: string
      productName: string
      orderId: string
      externalId: string
      refunded: boolean
      provider: 'LemonSqueezy'
      orderCreatedAt: Date
    } | null
  }>
  summary: {
    totalLicenses: number
    activeLicenses: number
    disabledLicenses: number
    personalLicenses: number
    teamLicenses: number
  }
}

export interface LemonSqueezyOrder {
  id: string
  type: string
  attributes: {
    store_id: number
    customer_id: number
    identifier: string
    order_number: number
    user_name: string
    user_email: string
    currency: string
    currency_rate: string
    subtotal: number
    setup_fee: number
    discount_total: number
    tax: number
    total: number
    subtotal_usd: number
    setup_fee_usd: number
    discount_total_usd: number
    tax_usd: number
    total_usd: number
    tax_name: string
    tax_rate: string
    tax_inclusive: boolean
    status: string
    status_formatted: string
    refunded: boolean
    refunded_at: string | null
    subtotal_formatted: string
    setup_fee_formatted: string
    discount_total_formatted: string
    tax_formatted: string
    total_formatted: string
    first_order_item: {
      id: number
      order_id: number
      product_id: number
      variant_id: number
      product_name: string
      variant_name: string
      price: number
      created_at: string
      updated_at: string
      test_mode: boolean
    }
    urls: {
      receipt: string
    }
    created_at: string
    updated_at: string
    test_mode: boolean
  }
}
