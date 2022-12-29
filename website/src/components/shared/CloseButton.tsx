import { IconButton, IconButtonProps } from './IconButton'

export const CloseButton = (props: IconButtonProps) => {
  return (
    // @ts-expect-error typings are wrong
    <IconButton
      variant="tertiary"
      size="md"
      position="absolute"
      top="4"
      right="4"
      color="fg.muted"
      {...props}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconButton>
  )
}
