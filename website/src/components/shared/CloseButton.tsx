import { FiX } from 'react-icons/fi'
import { IconButton, type IconButtonProps } from './IconButton'

export const CloseButton = (props: IconButtonProps) => (
  <IconButton
    variant="tertiary"
    size="md"
    position="absolute"
    top="4"
    right="4"
    color="fg.subtle"
    icon={<FiX />}
    {...props}
  />
)
