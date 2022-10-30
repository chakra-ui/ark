import {
  Popover,
  PopoverTrigger,
  PopoverPositioner,
  PopoverArrow,
  PopoverInnerArrow,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverCloseButton,
} from '@atlas/react'

export const PopoverReact = () => (
  <Popover>
    <PopoverTrigger>
      <button>click me</button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverArrow>
        <PopoverInnerArrow />
      </PopoverArrow>
      <PopoverContent>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description</PopoverDescription>
        <input type="text" />
        <PopoverCloseButton>close</PopoverCloseButton>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)
