'use client'

import type { ReactNode } from 'react'
import type { CollectionItem } from '../collection/index.ts'
import { type UseComboboxContext, useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxContextProps<T extends CollectionItem> {
  children: (context: UseComboboxContext<T>) => ReactNode
}

export const ComboboxContext = <T extends CollectionItem>(props: ComboboxContextProps<T>) =>
  props.children(useComboboxContext())
