import { useEffect, type RefObject } from 'react'

const defaultValidateElement = () => true
export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  validateElement: (element: HTMLElement) => boolean = defaultValidateElement,
) => {
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const node = event.target as HTMLElement
      if (ref.current && !ref.current.contains(node) && validateElement(node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback, ref, validateElement])
}
