import { Button, type ButtonProps, Link, type LinkProps } from '../ui'

const createHref = (subject = '') =>
  `mailto:support@chakra-ui.com?subject=${encodeURIComponent(subject)}`

interface MailToSupportLinkProps extends LinkProps {
  subject?: string
}

export const MailToSupportLink = (props: MailToSupportLinkProps) => {
  const { subject, children, ...rest } = props
  return (
    <Link href={createHref(subject)} {...rest}>
      {children || 'support@chakra-ui.com'}
    </Link>
  )
}

interface MailToSupportButtonProps extends ButtonProps {
  subject?: string
}

export const MailToSupportButton = (props: MailToSupportButtonProps) => {
  const { subject, children, ...buttonProps } = props
  return (
    <Button asChild {...buttonProps}>
      <Link href={createHref(subject)}>{children || 'Send us an email'}</Link>
    </Button>
  )
}
