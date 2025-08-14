import * as p from '@clack/prompts'
import dotenv from 'dotenv'
import { prisma } from '../src/lib/prisma'
import type { UserWithLicenseDetails, UserWithLicenses } from './types'

dotenv.config()

export async function findUserByEmail(email: string): Promise<UserWithLicenses | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
      include: {
        licenseKeys: {
          include: {
            orderItem: {
              include: {
                order: true,
              },
            },
          },
        },
      },
    })

    return user
  } catch (error) {
    console.error('Error finding user by email:', error)
    throw error
  }
}

export async function findUserWithLicenseDetails(email: string): Promise<UserWithLicenseDetails | null> {
  const user = await findUserByEmail(email)

  if (!user) {
    return null
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    licenses: user.licenseKeys.map((license) => ({
      id: license.id,
      key: license.key,
      disabled: license.disabled,
      type: license.type,
      order: license.orderItem
        ? {
            id: license.orderItem.id,
            productName: license.orderItem.productName,
            orderId: license.orderItem.order.id,
            externalId: license.orderItem.order.externalId,
            refunded: license.orderItem.order.refunded,
            provider: license.orderItem.order.provider,
            orderCreatedAt: license.orderItem.order.createdAt,
          }
        : null,
    })),
    summary: {
      totalLicenses: user.licenseKeys.length,
      activeLicenses: user.licenseKeys.filter((l) => !l.disabled).length,
      disabledLicenses: user.licenseKeys.filter((l) => l.disabled).length,
      personalLicenses: user.licenseKeys.filter((l) => l.type === 'Personal').length,
      teamLicenses: user.licenseKeys.filter((l) => l.type === 'Team').length,
    },
  }
}

async function displayUserDetails(result: UserWithLicenseDetails | null) {
  if (!result) return

  p.note(
    `
ID: ${result.user.id}
Name: ${result.user.name || 'N/A'}
Email: ${result.user.email}
Email Verified: ${result.user.emailVerified ? 'Yes' : 'No'}
Created: ${result.user.createdAt.toLocaleDateString()}
Updated: ${result.user.updatedAt.toLocaleDateString()}
`,
    'User Details',
  )

  p.note(
    `
Total Licenses: ${result.summary.totalLicenses}
Active Licenses: ${result.summary.activeLicenses}
Disabled Licenses: ${result.summary.disabledLicenses}
Personal Licenses: ${result.summary.personalLicenses}
Team Licenses: ${result.summary.teamLicenses}
`,
    'License Summary',
  )

  if (result.licenses.length > 0) {
    const licenseDetails = result.licenses
      .map((license, index) => {
        let details = `${index + 1}. ${license.key} (${license.type})`
        details += `\n   Status: ${license.disabled ? '🔴 Disabled' : '🟢 Active'}`
        if (license.order) {
          details += `\n   Product: ${license.order.productName}`
          details += `\n   Order: ${license.order.externalId}`
          details += `\n   Provider: ${license.order.provider}`
          details += `\n   Refunded: ${license.order.refunded ? '⚠️ Yes' : 'No'}`
          details += `\n   Order Date: ${license.order.orderCreatedAt.toLocaleDateString()}`
        }
        return details
      })
      .join('\n\n')

    p.note(licenseDetails, 'License Details')
  }
}

async function searchUserByEmail() {
  const searchType = await p.select({
    message: 'How would you like to search?',
    options: [
      { value: 'exact', label: '🎯 Exact email match' },
      { value: 'partial', label: '🔍 Partial email match' },
    ],
  })

  if (p.isCancel(searchType)) {
    p.cancel('Operation cancelled')
    return false
  }

  const email = await p.text({
    message:
      searchType === 'exact'
        ? 'Enter exact email address:'
        : 'Enter partial email (e.g., "john", "@gmail.com", "company.com"):',
    placeholder: searchType === 'exact' ? 'user@example.com' : 'john or @gmail.com or company.com',
    validate: (value) => {
      if (!value) return 'Search term is required'
      if (searchType === 'exact' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
    },
  })

  if (p.isCancel(email)) {
    p.cancel('Operation cancelled')
    return false
  }

  const spinner = p.spinner()
  spinner.start(`Searching for user${searchType === 'partial' ? 's' : ''}...`)

  try {
    if (searchType === 'exact') {
      const result = await findUserWithLicenseDetails(email)
      spinner.stop()

      if (!result) {
        p.log.warn(`No user found with email: ${email}`)
        return false
      }

      await displayUserDetails(result)
      return true
    } else {
      // Partial match
      const users = await prisma.user.findMany({
        where: {
          email: {
            contains: email.toLowerCase().trim(),
            mode: 'insensitive',
          },
        },
        include: {
          licenseKeys: {
            include: {
              orderItem: {
                include: {
                  order: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 20, // Limit to prevent too many results
      })

      spinner.stop()

      if (users.length === 0) {
        p.log.warn(`No users found matching: ${email}`)
        return false
      }

      if (users.length === 1) {
        p.log.success(`Found 1 user matching "${email}"`)
        const result = await findUserWithLicenseDetails(users[0].email)
        if (result) {
          await displayUserDetails(result)
        }
        return true
      }

      p.log.success(`Found ${users.length} users matching "${email}"`)

      const userOptions = users.map((user) => ({
        value: user.email,
        label: `${user.email} - ${user.name || 'No name'} (${user.licenseKeys.length} licenses)`,
      }))

      const selectedEmail = await p.select({
        message: 'Select user to view details:',
        options: userOptions,
      })

      if (p.isCancel(selectedEmail)) {
        p.cancel('Operation cancelled')
        return false
      }

      const result = await findUserWithLicenseDetails(selectedEmail)
      if (result) {
        await displayUserDetails(result)
        return true
      }
    }
  } catch (error) {
    spinner.stop()
    p.log.error('Error searching for user:')
    console.error(error)
    return false
  }

  return false
}

async function findOrdersByEmail() {
  const searchType = await p.select({
    message: 'How would you like to search?',
    options: [
      { value: 'exact', label: '🎯 Exact email match' },
      { value: 'partial', label: '🔍 Partial email match' },
    ],
  })

  if (p.isCancel(searchType)) {
    p.cancel('Operation cancelled')
    return
  }

  const email = await p.text({
    message:
      searchType === 'exact'
        ? 'Enter exact email address:'
        : 'Enter partial email (e.g., "john", "@gmail.com", "company.com"):',
    placeholder: searchType === 'exact' ? 'user@example.com' : 'john or @gmail.com or company.com',
    validate: (value) => {
      if (!value) return 'Search term is required'
      if (searchType === 'exact' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
    },
  })

  if (p.isCancel(email)) {
    p.cancel('Operation cancelled')
    return
  }

  const spinner = p.spinner()
  spinner.start(`Loading user${searchType === 'partial' ? 's' : ''} orders...`)

  try {
    let users: any[]

    if (searchType === 'exact') {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
        include: {
          licenseKeys: {
            include: {
              orderItem: {
                include: {
                  order: true,
                },
              },
            },
          },
        },
      })
      users = user ? [user] : []
    } else {
      users = await prisma.user.findMany({
        where: {
          email: {
            contains: email.toLowerCase().trim(),
            mode: 'insensitive',
          },
        },
        include: {
          licenseKeys: {
            include: {
              orderItem: {
                include: {
                  order: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10, // Limit for orders view
      })
    }

    spinner.stop()

    if (users.length === 0) {
      p.log.warn(`No user${searchType === 'partial' ? 's' : ''} found matching: ${email}`)
      return
    }

    // Handle single user case
    if (users.length === 1) {
      const user = users[0]

      // Debug: Show license information
      p.log.info(`Found user with ${user.licenseKeys.length} license keys`)
      user.licenseKeys.forEach((license: any, index: number) => {
        p.log.info(`License ${index + 1}: ${license.key} - OrderItem: ${license.orderItem ? 'Yes' : 'No'}`)
        if (license.orderItem) {
          p.log.info(`  Order: ${license.orderItem.order ? license.orderItem.order.externalId : 'No order'}`)
        }
      })

      const orders = user.licenseKeys
        .filter((license: any) => license.orderItem)
        .map((license: any) => license.orderItem?.order)
        .filter((order: any) => order !== undefined)
        .filter((order: any, index: number, self: any[]) => self.findIndex((o) => o.id === order.id) === index) // Remove duplicates

      if (orders.length === 0) {
        p.log.warn('User has no orders')
        // Let's also check if there are any license keys at all
        if (user.licenseKeys.length > 0) {
          p.log.warn('However, user has license keys but they are not linked to orders')
          const licenseDetails = user.licenseKeys
            .map((license: any) => `${license.key} (${license.type}) - ${license.disabled ? 'Disabled' : 'Active'}`)
            .join('\n')
          p.note(licenseDetails, 'Unlinked License Keys')
        }
        return
      }

      await displayOrdersForUser(user, orders)
      return
    }

    // Handle multiple users case
    if (searchType === 'partial') {
      p.log.success(`Found ${users.length} users matching "${email}"`)

      const userOptions = users.map((user: any) => {
        const orderCount = user.licenseKeys
          .filter((license: any) => license.orderItem)
          .map((license: any) => license.orderItem?.order.id)
          .filter((orderId: any, index: number, self: any[]) => self.indexOf(orderId) === index).length

        return {
          value: user.email,
          label: `${user.email} - ${user.name || 'No name'} (${orderCount} orders)`,
        }
      })

      const selectedEmail = await p.select({
        message: 'Select user to view orders:',
        options: userOptions,
      })

      if (p.isCancel(selectedEmail)) {
        p.cancel('Operation cancelled')
        return
      }

      const selectedUser = users.find((user: any) => user.email === selectedEmail)
      if (selectedUser) {
        // Debug: Show license information for selected user
        p.log.info(`Found user with ${selectedUser.licenseKeys.length} license keys`)
        selectedUser.licenseKeys.forEach((license: any, index: number) => {
          p.log.info(`License ${index + 1}: ${license.key} - OrderItem: ${license.orderItem ? 'Yes' : 'No'}`)
          if (license.orderItem) {
            p.log.info(`  Order: ${license.orderItem.order ? license.orderItem.order.externalId : 'No order'}`)
          }
        })

        const orders = selectedUser.licenseKeys
          .filter((license: any) => license.orderItem)
          .map((license: any) => license.orderItem?.order)
          .filter((order: any) => order !== undefined)
          .filter((order: any, index: number, self: any[]) => self.findIndex((o) => o.id === order.id) === index)

        if (orders.length === 0) {
          p.log.warn('User has no orders')
          // Let's also check if there are any license keys at all
          if (selectedUser.licenseKeys.length > 0) {
            p.log.warn('However, user has license keys but they are not linked to orders')
            const licenseDetails = selectedUser.licenseKeys
              .map((license: any) => `${license.key} (${license.type}) - ${license.disabled ? 'Disabled' : 'Active'}`)
              .join('\n')
            p.note(licenseDetails, 'Unlinked License Keys')
          }
          return
        }

        await displayOrdersForUser(selectedUser, orders)
      }
    }
  } catch (error) {
    spinner.stop()
    p.log.error('Error loading orders:')
    console.error(error)
  }
}

async function displayOrdersForUser(user: any, orders: any[]) {
  p.note(
    `
User: ${user.name || 'N/A'} (${user.email})
Total Orders: ${orders.length}
`,
    'User Summary',
  )

  const orderDetails = orders
    .map((order, index) => {
      const orderLicenses = user.licenseKeys.filter((license: any) => license.orderItem?.order.id === order.id)

      let details = `${index + 1}. Order ID: ${order.externalId}`
      details += `\n   Internal ID: ${order.id}`
      details += `\n   Provider: ${order.provider}`
      details += `\n   Status: ${order.refunded ? '⚠️ Refunded' : '✅ Active'}`
      details += `\n   Date: ${order.createdAt.toLocaleDateString()}`
      details += `\n   Licenses: ${orderLicenses.length}`

      orderLicenses.forEach((license: any) => {
        details += `\n     • ${license.key} (${license.type}) - ${license.disabled ? '🔴 Disabled' : '🟢 Active'}`
        if (license.orderItem) {
          details += ` - ${license.orderItem.productName}`
        }
      })

      return details
    })
    .join('\n\n')

  p.note(orderDetails, 'Order Details')
}

async function searchLemonSqueezyOrders(email: string) {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY
  if (!apiKey) {
    throw new Error('LEMON_SQUEEZY_API_KEY environment variable is not set')
  }

  const orders = []
  let currentPage = 1
  let hasMorePages = true

  while (hasMorePages) {
    try {
      const response = await fetch(
        `https://api.lemonsqueezy.com/v1/orders?page[number]=${currentPage}&page[size]=100`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        },
      )

      if (!response.ok) {
        throw new Error(`LemonSqueezy API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // Filter orders that match the email
      const matchingOrders = data.data.filter(
        (order: any) => order.attributes.user_email?.toLowerCase() === email.toLowerCase(),
      )

      orders.push(...matchingOrders)

      // Check if there are more pages
      hasMorePages = data.meta.page.currentPage < data.meta.page.lastPage
      currentPage++

      // Add a small delay to be respectful to the API
      if (hasMorePages) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    } catch (error) {
      console.error(`Error fetching page ${currentPage}:`, error)
      throw error
    }
  }

  return orders
}

async function findOrdersViaLemonSqueezy() {
  const searchType = await p.select({
    message: 'How would you like to search?',
    options: [
      { value: 'exact', label: '🎯 Exact email match' },
      { value: 'partial', label: '🔍 Partial email match (slower)' },
    ],
  })

  if (p.isCancel(searchType)) {
    p.cancel('Operation cancelled')
    return
  }

  const email = await p.text({
    message:
      searchType === 'exact'
        ? 'Enter exact email address:'
        : 'Enter partial email (e.g., "john", "@gmail.com", "company.com"):',
    placeholder: searchType === 'exact' ? 'user@example.com' : 'john or @gmail.com or company.com',
    validate: (value) => {
      if (!value) return 'Search term is required'
      if (searchType === 'exact' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
    },
  })

  if (p.isCancel(email)) {
    p.cancel('Operation cancelled')
    return
  }

  const spinner = p.spinner()
  spinner.start('Searching LemonSqueezy orders...')

  try {
    let orders = []

    if (searchType === 'exact') {
      orders = await searchLemonSqueezyOrders(email)
    } else {
      // For partial search, we need to get all orders and filter client-side
      // This is slower but necessary for partial matching
      spinner.message('Fetching all orders (this may take a moment)...')

      const apiKey = process.env.LEMON_SQUEEZY_API_KEY
      if (!apiKey) {
        throw new Error('LEMON_SQUEEZY_API_KEY environment variable is not set')
      }

      let currentPage = 1
      let hasMorePages = true
      const allOrders = []

      while (hasMorePages) {
        const response = await fetch(
          `https://api.lemonsqueezy.com/v1/orders?page[number]=${currentPage}&page[size]=100`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Accept: 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`LemonSqueezy API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        allOrders.push(...data.data)

        hasMorePages = data.meta.page.currentPage < data.meta.page.lastPage
        currentPage++

        // Update spinner with progress
        spinner.message(`Fetched page ${currentPage - 1}/${data.meta.page.lastPage}...`)

        if (hasMorePages) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }

      // Filter orders that contain the search term in email
      orders = allOrders.filter((order: any) =>
        order.attributes.user_email?.toLowerCase().includes(email.toLowerCase()),
      )
    }

    spinner.stop()

    if (orders.length === 0) {
      p.log.warn(`No orders found for email: ${email}`)
      return
    }

    p.log.success(`Found ${orders.length} order(s) matching "${email}"`)

    const orderDetails = orders
      .map((order: any, index: number) => {
        const attrs = order.attributes
        let details = `${index + 1}. Order #${attrs.order_number} (ID: ${order.id})`
        details += `\n   UUID: ${attrs.identifier}`
        details += `\n   Email: ${attrs.user_email}`
        details += `\n   Name: ${attrs.user_name || 'N/A'}`
        details += `\n   Status: ${attrs.status_formatted}`
        details += `\n   Total: ${attrs.total_formatted}`
        details += `\n   Date: ${new Date(attrs.created_at).toLocaleDateString()}`
        details += `\n   Refunded: ${attrs.refunded ? '⚠️ Yes' : 'No'}`

        if (attrs.first_order_item) {
          details += `\n   Product: ${attrs.first_order_item.product_name}`
          if (attrs.first_order_item.variant_name !== 'Default') {
            details += ` (${attrs.first_order_item.variant_name})`
          }
        }

        return details
      })
      .join('\n\n')

    p.note(orderDetails, 'LemonSqueezy Orders')
  } catch (error) {
    spinner.stop()
    p.log.error('Error searching LemonSqueezy orders:')
    console.error(error)
  }
}

async function findOrderByOrderId() {
  const orderId = await p.text({
    message: 'Enter order ID to search:',
    placeholder: '6176414 or fe5ff2d9-16b9-4f25-bb46-32a81138f0f8',
    validate: (value) => {
      if (!value) return 'Order ID is required'
    },
  })

  if (p.isCancel(orderId)) {
    p.cancel('Operation cancelled')
    return
  }

  const spinner = p.spinner()
  spinner.start('Searching database for order...')

  try {
    // Search by externalId (LemonSqueezy order ID or UUID)
    const order = await prisma.order.findFirst({
      where: {
        externalId: orderId.trim(),
      },
      include: {
        orderItems: {
          include: {
            licenseKey: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

    spinner.stop()

    if (!order) {
      p.log.warn(`No order found with ID: ${orderId}`)

      // Also search in license keys directly in case the order wasn't synced properly
      spinner.start('Searching license keys...')
      const licenseKeys = await prisma.licenseKey.findMany({
        where: {
          orderItem: {
            order: {
              externalId: orderId.trim(),
            },
          },
        },
        include: {
          user: true,
          orderItem: {
            include: {
              order: true,
            },
          },
        },
      })

      spinner.stop()

      if (licenseKeys.length > 0) {
        p.log.success(`Found ${licenseKeys.length} license key(s) for order ${orderId}`)

        const licenseDetails = licenseKeys
          .map((license, index) => {
            let details = `${index + 1}. License: ${license.key}`
            details += `\n   Type: ${license.type}`
            details += `\n   Status: ${license.disabled ? '🔴 Disabled' : '🟢 Active'}`
            details += `\n   User: ${license.user ? `${license.user.email} (${license.user.name || 'No name'})` : '❌ Not assigned'}`
            if (license.orderItem) {
              details += `\n   Product: ${license.orderItem.productName}`
              details += `\n   Order: ${license.orderItem.order.externalId}`
            }
            return details
          })
          .join('\n\n')

        p.note(licenseDetails, 'License Keys')
      } else {
        p.log.error('No license keys found either. Order may not exist in the system.')
      }
      return
    }

    p.log.success(`Found order: ${order.externalId}`)

    let orderDetails = `Order Details:`
    orderDetails += `\n  Internal ID: ${order.id}`
    orderDetails += `\n  External ID: ${order.externalId}`
    orderDetails += `\n  Provider: ${order.provider}`
    orderDetails += `\n  Refunded: ${order.refunded ? '⚠️ Yes' : 'No'}`
    orderDetails += `\n  Created: ${order.createdAt.toLocaleDateString()}`
    orderDetails += `\n  Order Items: ${order.orderItems.length}`

    p.note(orderDetails, 'Order Information')

    if (order.orderItems.length > 0) {
      const itemDetails = order.orderItems
        .map((item, index) => {
          let details = `${index + 1}. ${item.productName}`
          details += `\n   Item ID: ${item.id}`
          details += `\n   License Key: ${item.licenseKey?.key || '❌ No license key'}`
          details += `\n   License Type: ${item.licenseKey?.type || 'N/A'}`
          details += `\n   License Status: ${item.licenseKey?.disabled ? '🔴 Disabled' : item.licenseKey ? '🟢 Active' : 'N/A'}`

          if (item.licenseKey?.user) {
            details += `\n   Assigned to: ${item.licenseKey.user.email}`
            details += `\n   User Name: ${item.licenseKey.user.name || 'No name'}`
          } else {
            details += `\n   Assigned to: ❌ Not assigned to any user`
          }

          return details
        })
        .join('\n\n')

      p.note(itemDetails, 'Order Items & License Keys')
    }
  } catch (error) {
    spinner.stop()
    p.log.error('Error searching for order:')
    console.error(error)
  }
}

async function disconnectLicenseKey() {
  const searchType = await p.select({
    message: 'How would you like to search for user?',
    options: [
      { value: 'exact', label: '🎯 Exact email match' },
      { value: 'partial', label: '🔍 Partial email match' },
    ],
  })

  if (p.isCancel(searchType)) {
    p.cancel('Operation cancelled')
    return
  }

  const email = await p.text({
    message:
      searchType === 'exact'
        ? 'Enter exact email address:'
        : 'Enter partial email (e.g., "john", "@gmail.com", "company.com"):',
    placeholder: searchType === 'exact' ? 'user@example.com' : 'john or @gmail.com or company.com',
    validate: (value) => {
      if (!value) return 'Search term is required'
      if (searchType === 'exact' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address'
      }
    },
  })

  if (p.isCancel(email)) {
    p.cancel('Operation cancelled')
    return
  }

  const spinner = p.spinner()
  spinner.start(`Loading user${searchType === 'partial' ? 's' : ''} licenses...`)

  try {
    let result: Awaited<ReturnType<typeof findUserWithLicenseDetails>> | null = null

    if (searchType === 'exact') {
      result = await findUserWithLicenseDetails(email)
    } else {
      // Partial match - find users first
      const users = await prisma.user.findMany({
        where: {
          email: {
            contains: email.toLowerCase().trim(),
            mode: 'insensitive',
          },
        },
        include: {
          licenseKeys: {
            include: {
              orderItem: {
                include: {
                  order: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 20,
      })

      spinner.stop()

      if (users.length === 0) {
        p.log.warn(`No users found matching: ${email}`)
        return
      }

      let selectedUser: any
      if (users.length === 1) {
        selectedUser = users[0]
        p.log.success(`Found 1 user matching "${email}": ${selectedUser.email}`)
      } else {
        p.log.success(`Found ${users.length} users matching "${email}"`)

        const userOptions = users.map((user) => ({
          value: user.email,
          label: `${user.email} - ${user.name || 'No name'} (${user.licenseKeys.length} licenses)`,
        }))

        const selectedEmail = await p.select({
          message: 'Select user to disconnect license:',
          options: userOptions,
        })

        if (p.isCancel(selectedEmail)) {
          p.cancel('Operation cancelled')
          return
        }

        selectedUser = users.find((user) => user.email === selectedEmail)
      }

      if (selectedUser) {
        result = await findUserWithLicenseDetails(selectedUser.email)
        spinner.start('Loading license details...')
      }
    }

    spinner.stop()

    if (!result) {
      p.log.warn(`No user found with email: ${email}`)
      return
    }

    if (result.licenses.length === 0) {
      p.log.warn('User has no licenses to disconnect')
      return
    }

    const licenseOptions = result.licenses.map((license) => ({
      value: license.id,
      label: `${license.key} (${license.type}) - ${license.disabled ? '🔴 Disabled' : '🟢 Active'}${license.order ? ` - ${license.order.productName}` : ''}`,
    }))

    const selectedLicenseId = await p.select({
      message: 'Select license to disconnect from user:',
      options: licenseOptions,
    })

    if (p.isCancel(selectedLicenseId)) {
      p.cancel('Operation cancelled')
      return
    }

    const selectedLicense = result.licenses.find((l) => l.id === selectedLicenseId)
    if (!selectedLicense) return

    const confirmDisconnect = await p.confirm({
      message: `Disconnect license ${selectedLicense.key} from user ${result.user.email}?`,
    })

    if (p.isCancel(confirmDisconnect) || !confirmDisconnect) {
      p.cancel('Operation cancelled')
      return
    }

    const updateSpinner = p.spinner()
    updateSpinner.start('Disconnecting license...')

    // Disconnect license by setting userId to null
    await prisma.licenseKey.update({
      where: { id: selectedLicenseId },
      data: { userId: null },
    })

    updateSpinner.stop()

    if (selectedLicense.order) {
      const thankYouUrl = `https://ark-ui.com/plus/thank-you?orderId=${selectedLicense.order.externalId}`
      p.log.success(`License disconnected successfully!`)
      p.note(`Thank you page URL:\n${thankYouUrl}`, 'Reconnection URL')

      // Copy to clipboard if available
      try {
        const { exec } = require('node:child_process')
        exec(`echo "${thankYouUrl}" | pbcopy`, (error: any) => {
          if (!error) {
            p.log.info('URL copied to clipboard!')
          }
        })
      } catch {
        // Ignore clipboard errors
      }
    } else {
      p.log.success(`License disconnected successfully!`)
      p.log.warn('No order found for this license - cannot generate thank you URL')
    }
  } catch (error) {
    spinner.stop()
    p.log.error('Error disconnecting license:')
    console.error(error)
  }
}

async function main() {
  console.clear()

  p.intro('🔑 Ark UI Admin CLI')

  while (true) {
    const action = await p.select({
      message: 'What would you like to do?',
      options: [
        { value: 'search', label: '🔍 Search user by email' },
        { value: 'orders', label: '📋 Find orders by email (Database)' },
        { value: 'lemon', label: '🍋 Search LemonSqueezy orders (API)' },
        { value: 'orderid', label: '📦 Find order by Order ID' },
        { value: 'disconnect', label: '🔓 Disconnect license key' },
        { value: 'exit', label: '👋 Exit' },
      ],
    })

    if (p.isCancel(action)) {
      p.cancel('Goodbye!')
      break
    }

    switch (action) {
      case 'search':
        await searchUserByEmail()
        break
      case 'orders':
        await findOrdersByEmail()
        break
      case 'lemon':
        await findOrdersViaLemonSqueezy()
        break
      case 'orderid':
        await findOrderByOrderId()
        break
      case 'disconnect':
        await disconnectLicenseKey()
        break
      case 'exit':
        p.outro('Thanks for using Ark UI Admin CLI!')
        process.exit(0)
    }

    const continuePrompt = await p.confirm({
      message: 'Would you like to perform another action?',
    })

    if (p.isCancel(continuePrompt) || !continuePrompt) {
      p.outro('Thanks for using Ark UI Admin CLI!')
      break
    }
  }
}

// CLI usage
if (require.main === module) {
  main()
    .catch((error) => {
      p.log.error('Fatal error:')
      console.error(error)
      process.exit(1)
    })
    .finally(() => {
      prisma.$disconnect()
    })
}
