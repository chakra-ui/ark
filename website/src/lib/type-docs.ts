import fs from 'fs-extra'

async function getTypeDoc(framework: string, type: string) {
  const file = await fs.readFile(`../packages/${framework}/generated-type-docs/${type}.json`)
  const data: Record<string, { type: string; defaultValue?: string; description?: string }> =
    JSON.parse(file.toString())
  return Object.entries(data).map(([name, value]) => ({ name, ...value }))
}

/**
 * Prerequisite:
 * Run `pnpm run typedocs` in the mono repo root first
 * to generate the json files which contain the type information
 */
export async function getTypeDocsForComponent(framework: string, component: string) {
  const type = {
    accordion: 'AccordionProps',
    checkbox: 'CheckboxProps',
    dialog: 'DialogProps',
    editable: 'EditableProps',
    'hover-card': 'HoverCardProps',
    'number-input': 'NumberInputProps',
    menu: 'MenuProps',
    pagination: 'PaginationProps',
    'pin-input': 'PinInputProps',
    pressable: 'PressableProps',
    popover: 'PopoverProps',
    'radio-group': 'RadioGroupProps',
    'range-slider': 'RangeSliderProps',
    'rating-group': 'RatingGroupProps',
    slider: 'SliderProps',
    tabs: 'TabsProps',
    'tags-input': 'TagsInputProps',
    toast: 'ToastProps',
    tooltip: 'TooltipProps',
  }[component]

  if (!type) {
    return []
  }

  try {
    return await getTypeDoc(framework, type)
  } catch (e) {
    console.error(
      `Couldn't find type docs for component ${component}/${framework}`,
      (e as NodeJS.ErrnoException).path,
    )
    return []
  }
}
