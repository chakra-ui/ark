import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'

const testArray = [1, 2, 3, 4, 5]
Object.defineProperties(testArray, {
  customProperty: { value: 'custom value', enumerable: false, writable: false },
  anotherProperty: { value: 42, enumerable: false, writable: false },
})

export const ArrayData = () => {
  return (
    <JsonTreeView.Root
      data={{
        normalArray: [1, 2, 3],
        arrayWithNonEnumerableProperties: testArray,
        sparseArray: (() => {
          const sparse = []
          sparse[0] = 'first'
          sparse[5] = 'sixth'
          return sparse
        })(),
      }}
    >
      <JsonTreeView.Tree arrowIcon={<ChevronRightIcon />} />
    </JsonTreeView.Root>
  )
}
