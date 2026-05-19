import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import {
  ARK_DATE_PICKER_TABLE_CONTEXT,
  injectArkDatePickerContext,
  injectArkDatePickerViewContext,
} from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerTable]',
  standalone: true,
  exportAs: 'arkDatePickerTable',
  providers: [
    {
      provide: ARK_DATE_PICKER_TABLE_CONTEXT,
      useFactory: (table: ArkDatePickerTable) => table.getTableContext(),
      deps: [forwardRef(() => ArkDatePickerTable)],
    },
  ],
})
export class ArkDatePickerTable {
  /** The number of columns in the table grid. */
  readonly columns: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The table id. */
  readonly idInput: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'id' })

  private readonly fallbackId = createArkId('date-picker-table')
  private readonly view = injectArkDatePickerViewContext()
  private readonly tableContext = computed(() => ({
    ...this.view(),
    columns: this.columns(),
    id: this.idInput() ?? this.fallbackId,
  }))

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTableProps(this.tableContext()),
    })
  }

  /** @internal Exposed for table-scoped date picker directives. */
  getTableContext(): typeof this.tableContext {
    return this.tableContext
  }
}
