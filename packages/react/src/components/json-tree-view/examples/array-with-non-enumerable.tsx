import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'

export const ArrayWithNonEnumerable = () => {
  const testArray = [1, 2, 3, 4, 5]
  Object.defineProperties(testArray, {
    customProperty: { value: 'custom value', enumerable: false, writable: false },
    anotherProperty: { value: 42, enumerable: false, writable: false },
  })

  return (
    <JsonTreeView
      arrowIcon={<ChevronRightIcon />}
      onSelectionChange={(details) => {
        console.log(details.selectedValue)
      }}
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
    />
  )
}
