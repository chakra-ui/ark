import fs from 'fs-extra'

async function getTypeDoc(framework: string, type: string) {
  const file = await fs.readFile(`../packages/${framework}/generated-type-docs/${type}.json`)
  const data: Record<
    string,
    {
      type: string
      defaultValue?: string
      isRequired: boolean
      description?: string
    }
  > = JSON.parse(file.toString())
  return Object.entries(data).map(([name, value]) => ({ name, ...value }))
}

/**
 * Prerequisite:
 * Run `pnpm run typedocs` in the mono repo root first
 * to generate the json files which contain the type information
 */
export async function getTypeDocsForComponent(framework: string, component: string) {
  const types = {
    accordion: ['AccordionProps', 'AccordionItemProps'],
    checkbox: ['CheckboxProps'],
    dialog: ['DialogProps'],
    editable: ['EditableProps'],
    'hover-card': ['HoverCardProps'],
    'number-input': ['NumberInputProps'],
    menu: [
      'MenuProps',
      'MenuItemProps',
      'MenuItemGroupProps',
      'MenuItemGroupLabelProps',
      'MenuDividerProps',
    ],
    pagination: [
      'PaginationProps',
      'PageProps',
      'PaginationPageTriggerProps',
      'PaginationEllipsisProps',
    ],
    'pin-input': ['PinInputProps', 'PinInputFieldProps'],
    pressable: ['PressableProps'],
    popover: ['PopoverProps'],
    'radio-group': ['RadioGroupProps', 'RadioProps'],
    'range-slider': ['RangeSliderProps', 'RangeSliderMarkerProps', 'RangeSliderThumbProps'],
    'rating-group': ['RatingGroupProps', 'RatingProps'],
    select: [
      'SelectProps',
      'SelectOptionProps',
      'SelectOptionGroupProps',
      'SelectOptionGroupLabelProps',
    ],
    slider: ['SliderProps', 'SliderMarkerProps'],
    tabs: ['TabsProps', 'TabProps', 'TabTriggerProps', 'TabContentProps'],
    'tags-input': ['TagsInputProps', 'TagInputProps', 'TagProps', 'TagDeleteTriggerProps'],
    toast: ['ToastProviderProps', 'ToastProps', 'ToastGroupProps'],
    tooltip: ['TooltipProps'],
  }[component]

  if (!types) {
    return []
  }

  const settledPromises = await Promise.allSettled(
    types.map(async (name) => ({
      name,
      properties: await getTypeDoc(framework, name),
    })),
  )

  const warnings = settledPromises
    .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    .map(
      (result) =>
        `[warning]: Couldn't find type docs for component ${framework}/${component}: ${
          (result.reason as NodeJS.ErrnoException).path
        }`,
    )
    .join('\n')

  if (warnings) {
    console.warn(warnings)
  }

  return settledPromises
    .filter(
      <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
        result.status === 'fulfilled',
    )
    .map((result) => result.value)
}
