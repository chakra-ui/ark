import { useState } from 'react'
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from './'

export const Basic = () => (
  <Popover>
    <PopoverTrigger>
      <button>click me</button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverArrow>
        <PopoverArrowTip />
      </PopoverArrow>
      <PopoverContent>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description</PopoverDescription>
        <input type="text" />
        <PopoverCloseTrigger>
          <button>close</button>
        </PopoverCloseTrigger>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)

export const Controlled = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>click me</button>
      <Popover isOpen={isOpen} onOpenChange={setOpen}>
        <PopoverAnchor>
          <span>anchor</span>
        </PopoverAnchor>
        <PopoverPositioner>
          <PopoverArrow>
            <PopoverArrowTip />
          </PopoverArrow>
          <PopoverContent>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
            <input type="text" />
            <PopoverCloseTrigger>
              <button>close</button>
            </PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </>
  )
}
