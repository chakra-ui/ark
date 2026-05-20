import { ChangeDetectionStrategy, Component, type ElementRef, computed, signal, viewChild } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxInput,
  ArkComboboxItem,
  ArkComboboxItemIndicator,
  ArkComboboxItemText,
  ArkComboboxLabel,
  ArkComboboxPositioner,
  ArkComboboxRoot,
  ArkComboboxTrigger,
  type ComboboxInputValueChangeDetails,
  type ComboboxScrollToIndexDetails,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Country {
  value: string
  label: string
  emoji: string
}

interface VirtualItem {
  index: number
  item: Country
}

const countries: Country[] = [
  { value: 'AD', label: 'Andorra', emoji: '🇦🇩' },
  { value: 'AE', label: 'United Arab Emirates', emoji: '🇦🇪' },
  { value: 'AF', label: 'Afghanistan', emoji: '🇦🇫' },
  { value: 'AG', label: 'Antigua and Barbuda', emoji: '🇦🇬' },
  { value: 'AI', label: 'Anguilla', emoji: '🇦🇮' },
  { value: 'AL', label: 'Albania', emoji: '🇦🇱' },
  { value: 'AM', label: 'Armenia', emoji: '🇦🇲' },
  { value: 'AO', label: 'Angola', emoji: '🇦🇴' },
  { value: 'AQ', label: 'Antarctica', emoji: '🇦🇶' },
  { value: 'AR', label: 'Argentina', emoji: '🇦🇷' },
  { value: 'AS', label: 'American Samoa', emoji: '🇦🇸' },
  { value: 'AT', label: 'Austria', emoji: '🇦🇹' },
  { value: 'AU', label: 'Australia', emoji: '🇦🇺' },
  { value: 'AW', label: 'Aruba', emoji: '🇦🇼' },
  { value: 'AX', label: 'Åland Islands', emoji: '🇦🇽' },
  { value: 'AZ', label: 'Azerbaijan', emoji: '🇦🇿' },
  { value: 'BA', label: 'Bosnia and Herzegovina', emoji: '🇧🇦' },
  { value: 'BB', label: 'Barbados', emoji: '🇧🇧' },
  { value: 'BD', label: 'Bangladesh', emoji: '🇧🇩' },
  { value: 'BE', label: 'Belgium', emoji: '🇧🇪' },
  { value: 'BF', label: 'Burkina Faso', emoji: '🇧🇫' },
  { value: 'BG', label: 'Bulgaria', emoji: '🇧🇬' },
  { value: 'BH', label: 'Bahrain', emoji: '🇧🇭' },
  { value: 'BI', label: 'Burundi', emoji: '🇧🇮' },
  { value: 'BJ', label: 'Benin', emoji: '🇧🇯' },
  { value: 'BL', label: 'Saint Barthélemy', emoji: '🇧🇱' },
  { value: 'BM', label: 'Bermuda', emoji: '🇧🇲' },
  { value: 'BN', label: 'Brunei', emoji: '🇧🇳' },
  { value: 'BO', label: 'Bolivia', emoji: '🇧🇴' },
  { value: 'BR', label: 'Brazil', emoji: '🇧🇷' },
  { value: 'BS', label: 'Bahamas', emoji: '🇧🇸' },
  { value: 'BT', label: 'Bhutan', emoji: '🇧🇹' },
  { value: 'BW', label: 'Botswana', emoji: '🇧🇼' },
  { value: 'BY', label: 'Belarus', emoji: '🇧🇾' },
  { value: 'BZ', label: 'Belize', emoji: '🇧🇿' },
  { value: 'CA', label: 'Canada', emoji: '🇨🇦' },
  { value: 'CD', label: 'Congo', emoji: '🇨🇩' },
  { value: 'CF', label: 'Central African Republic', emoji: '🇨🇫' },
  { value: 'CH', label: 'Switzerland', emoji: '🇨🇭' },
  { value: 'CI', label: "Côte d'Ivoire", emoji: '🇨🇮' },
  { value: 'CK', label: 'Cook Islands', emoji: '🇨🇰' },
  { value: 'CL', label: 'Chile', emoji: '🇨🇱' },
  { value: 'CM', label: 'Cameroon', emoji: '🇨🇲' },
  { value: 'CN', label: 'China', emoji: '🇨🇳' },
  { value: 'CO', label: 'Colombia', emoji: '🇨🇴' },
  { value: 'CR', label: 'Costa Rica', emoji: '🇨🇷' },
  { value: 'CU', label: 'Cuba', emoji: '🇨🇺' },
  { value: 'CV', label: 'Cabo Verde', emoji: '🇨🇻' },
  { value: 'CY', label: 'Cyprus', emoji: '🇨🇾' },
  { value: 'CZ', label: 'Czech Republic', emoji: '🇨🇿' },
  { value: 'DE', label: 'Germany', emoji: '🇩🇪' },
  { value: 'DJ', label: 'Djibouti', emoji: '🇩🇯' },
  { value: 'DK', label: 'Denmark', emoji: '🇩🇰' },
  { value: 'DM', label: 'Dominica', emoji: '🇩🇲' },
  { value: 'DO', label: 'Dominican Republic', emoji: '🇩🇴' },
  { value: 'DZ', label: 'Algeria', emoji: '🇩🇿' },
  { value: 'EC', label: 'Ecuador', emoji: '🇪🇨' },
  { value: 'EE', label: 'Estonia', emoji: '🇪🇪' },
  { value: 'EG', label: 'Egypt', emoji: '🇪🇬' },
  { value: 'ER', label: 'Eritrea', emoji: '🇪🇷' },
  { value: 'ES', label: 'Spain', emoji: '🇪🇸' },
  { value: 'ET', label: 'Ethiopia', emoji: '🇪🇹' },
  { value: 'FI', label: 'Finland', emoji: '🇫🇮' },
  { value: 'FJ', label: 'Fiji', emoji: '🇫🇯' },
  { value: 'FK', label: 'Falkland Islands', emoji: '🇫🇰' },
  { value: 'FM', label: 'Micronesia', emoji: '🇫🇲' },
  { value: 'FO', label: 'Faroe Islands', emoji: '🇫🇴' },
  { value: 'FR', label: 'France', emoji: '🇫🇷' },
  { value: 'GA', label: 'Gabon', emoji: '🇬🇦' },
  { value: 'GB', label: 'United Kingdom', emoji: '🇬🇧' },
  { value: 'GD', label: 'Grenada', emoji: '🇬🇩' },
  { value: 'GE', label: 'Georgia', emoji: '🇬🇪' },
  { value: 'GH', label: 'Ghana', emoji: '🇬🇭' },
  { value: 'GI', label: 'Gibraltar', emoji: '🇬🇮' },
  { value: 'GL', label: 'Greenland', emoji: '🇬🇱' },
  { value: 'GM', label: 'Gambia', emoji: '🇬🇲' },
  { value: 'GN', label: 'Guinea', emoji: '🇬🇳' },
  { value: 'GQ', label: 'Equatorial Guinea', emoji: '🇬🇶' },
  { value: 'GR', label: 'Greece', emoji: '🇬🇷' },
  { value: 'GT', label: 'Guatemala', emoji: '🇬🇹' },
  { value: 'GU', label: 'Guam', emoji: '🇬🇺' },
  { value: 'GW', label: 'Guinea-Bissau', emoji: '🇬🇼' },
  { value: 'GY', label: 'Guyana', emoji: '🇬🇾' },
  { value: 'HK', label: 'Hong Kong', emoji: '🇭🇰' },
  { value: 'HN', label: 'Honduras', emoji: '🇭🇳' },
  { value: 'HR', label: 'Croatia', emoji: '🇭🇷' },
  { value: 'HT', label: 'Haiti', emoji: '🇭🇹' },
  { value: 'HU', label: 'Hungary', emoji: '🇭🇺' },
  { value: 'ID', label: 'Indonesia', emoji: '🇮🇩' },
  { value: 'IE', label: 'Ireland', emoji: '🇮🇪' },
  { value: 'IL', label: 'Israel', emoji: '🇮🇱' },
  { value: 'IM', label: 'Isle of Man', emoji: '🇮🇲' },
  { value: 'IN', label: 'India', emoji: '🇮🇳' },
  { value: 'IQ', label: 'Iraq', emoji: '🇮🇶' },
  { value: 'IR', label: 'Iran', emoji: '🇮🇷' },
  { value: 'IS', label: 'Iceland', emoji: '🇮🇸' },
  { value: 'IT', label: 'Italy', emoji: '🇮🇹' },
  { value: 'JE', label: 'Jersey', emoji: '🇯🇪' },
  { value: 'JM', label: 'Jamaica', emoji: '🇯🇲' },
  { value: 'JO', label: 'Jordan', emoji: '🇯🇴' },
  { value: 'JP', label: 'Japan', emoji: '🇯🇵' },
  { value: 'KE', label: 'Kenya', emoji: '🇰🇪' },
  { value: 'KG', label: 'Kyrgyzstan', emoji: '🇰🇬' },
  { value: 'KH', label: 'Cambodia', emoji: '🇰🇭' },
  { value: 'KI', label: 'Kiribati', emoji: '🇰🇮' },
  { value: 'KM', label: 'Comoros', emoji: '🇰🇲' },
  { value: 'KN', label: 'Saint Kitts and Nevis', emoji: '🇰🇳' },
  { value: 'KP', label: 'North Korea', emoji: '🇰🇵' },
  { value: 'KR', label: 'South Korea', emoji: '🇰🇷' },
  { value: 'KW', label: 'Kuwait', emoji: '🇰🇼' },
  { value: 'KY', label: 'Cayman Islands', emoji: '🇰🇾' },
  { value: 'KZ', label: 'Kazakhstan', emoji: '🇰🇿' },
  { value: 'LA', label: 'Laos', emoji: '🇱🇦' },
  { value: 'LB', label: 'Lebanon', emoji: '🇱🇧' },
  { value: 'LC', label: 'Saint Lucia', emoji: '🇱🇨' },
  { value: 'LI', label: 'Liechtenstein', emoji: '🇱🇮' },
  { value: 'LK', label: 'Sri Lanka', emoji: '🇱🇰' },
  { value: 'LR', label: 'Liberia', emoji: '🇱🇷' },
  { value: 'LS', label: 'Lesotho', emoji: '🇱🇸' },
  { value: 'LT', label: 'Lithuania', emoji: '🇱🇹' },
  { value: 'LU', label: 'Luxembourg', emoji: '🇱🇺' },
  { value: 'LV', label: 'Latvia', emoji: '🇱🇻' },
  { value: 'LY', label: 'Libya', emoji: '🇱🇾' },
  { value: 'MA', label: 'Morocco', emoji: '🇲🇦' },
  { value: 'MC', label: 'Monaco', emoji: '🇲🇨' },
  { value: 'MD', label: 'Moldova', emoji: '🇲🇩' },
  { value: 'ME', label: 'Montenegro', emoji: '🇲🇪' },
  { value: 'MG', label: 'Madagascar', emoji: '🇲🇬' },
  { value: 'MH', label: 'Marshall Islands', emoji: '🇲🇭' },
  { value: 'MK', label: 'North Macedonia', emoji: '🇲🇰' },
  { value: 'ML', label: 'Mali', emoji: '🇲🇱' },
  { value: 'MM', label: 'Myanmar', emoji: '🇲🇲' },
  { value: 'MN', label: 'Mongolia', emoji: '🇲🇳' },
  { value: 'MO', label: 'Macao', emoji: '🇲🇴' },
  { value: 'MR', label: 'Mauritania', emoji: '🇲🇷' },
  { value: 'MS', label: 'Montserrat', emoji: '🇲🇸' },
  { value: 'MT', label: 'Malta', emoji: '🇲🇹' },
  { value: 'MU', label: 'Mauritius', emoji: '🇲🇺' },
  { value: 'MV', label: 'Maldives', emoji: '🇲🇻' },
  { value: 'MW', label: 'Malawi', emoji: '🇲🇼' },
  { value: 'MX', label: 'Mexico', emoji: '🇲🇽' },
  { value: 'MY', label: 'Malaysia', emoji: '🇲🇾' },
  { value: 'MZ', label: 'Mozambique', emoji: '🇲🇿' },
  { value: 'NA', label: 'Namibia', emoji: '🇳🇦' },
  { value: 'NC', label: 'New Caledonia', emoji: '🇳🇨' },
  { value: 'NE', label: 'Niger', emoji: '🇳🇪' },
  { value: 'NF', label: 'Norfolk Island', emoji: '🇳🇫' },
  { value: 'NG', label: 'Nigeria', emoji: '🇳🇬' },
  { value: 'NI', label: 'Nicaragua', emoji: '🇳🇮' },
  { value: 'NL', label: 'Netherlands', emoji: '🇳🇱' },
  { value: 'NO', label: 'Norway', emoji: '🇳🇴' },
  { value: 'NP', label: 'Nepal', emoji: '🇳🇵' },
  { value: 'NR', label: 'Nauru', emoji: '🇳🇷' },
  { value: 'NU', label: 'Niue', emoji: '🇳🇺' },
  { value: 'NZ', label: 'New Zealand', emoji: '🇳🇿' },
  { value: 'OM', label: 'Oman', emoji: '🇴🇲' },
  { value: 'PA', label: 'Panama', emoji: '🇵🇦' },
  { value: 'PE', label: 'Peru', emoji: '🇵🇪' },
  { value: 'PF', label: 'French Polynesia', emoji: '🇵🇫' },
  { value: 'PG', label: 'Papua New Guinea', emoji: '🇵🇬' },
  { value: 'PH', label: 'Philippines', emoji: '🇵🇭' },
  { value: 'PK', label: 'Pakistan', emoji: '🇵🇰' },
  { value: 'PL', label: 'Poland', emoji: '🇵🇱' },
  { value: 'PR', label: 'Puerto Rico', emoji: '🇵🇷' },
  { value: 'PS', label: 'Palestine', emoji: '🇵🇸' },
  { value: 'PT', label: 'Portugal', emoji: '🇵🇹' },
  { value: 'PW', label: 'Palau', emoji: '🇵🇼' },
  { value: 'PY', label: 'Paraguay', emoji: '🇵🇾' },
  { value: 'QA', label: 'Qatar', emoji: '🇶🇦' },
  { value: 'RO', label: 'Romania', emoji: '🇷🇴' },
  { value: 'RS', label: 'Serbia', emoji: '🇷🇸' },
  { value: 'RU', label: 'Russia', emoji: '🇷🇺' },
  { value: 'RW', label: 'Rwanda', emoji: '🇷🇼' },
  { value: 'SA', label: 'Saudi Arabia', emoji: '🇸🇦' },
  { value: 'SB', label: 'Solomon Islands', emoji: '🇸🇧' },
  { value: 'SC', label: 'Seychelles', emoji: '🇸🇨' },
  { value: 'SD', label: 'Sudan', emoji: '🇸🇩' },
  { value: 'SE', label: 'Sweden', emoji: '🇸🇪' },
  { value: 'SG', label: 'Singapore', emoji: '🇸🇬' },
  { value: 'SI', label: 'Slovenia', emoji: '🇸🇮' },
  { value: 'SK', label: 'Slovakia', emoji: '🇸🇰' },
  { value: 'SL', label: 'Sierra Leone', emoji: '🇸🇱' },
  { value: 'SM', label: 'San Marino', emoji: '🇸🇲' },
  { value: 'SN', label: 'Senegal', emoji: '🇸🇳' },
  { value: 'SO', label: 'Somalia', emoji: '🇸🇴' },
  { value: 'SR', label: 'Suriname', emoji: '🇸🇷' },
  { value: 'SS', label: 'South Sudan', emoji: '🇸🇸' },
  { value: 'ST', label: 'Sao Tome and Principe', emoji: '🇸🇹' },
  { value: 'SV', label: 'El Salvador', emoji: '🇸🇻' },
  { value: 'SY', label: 'Syria', emoji: '🇸🇾' },
  { value: 'SZ', label: 'Eswatini', emoji: '🇸🇿' },
  { value: 'TC', label: 'Turks and Caicos Islands', emoji: '🇹🇨' },
  { value: 'TD', label: 'Chad', emoji: '🇹🇩' },
  { value: 'TG', label: 'Togo', emoji: '🇹🇬' },
  { value: 'TH', label: 'Thailand', emoji: '🇹🇭' },
  { value: 'TJ', label: 'Tajikistan', emoji: '🇹🇯' },
  { value: 'TK', label: 'Tokelau', emoji: '🇹🇰' },
  { value: 'TL', label: 'Timor-Leste', emoji: '🇹🇱' },
  { value: 'TM', label: 'Turkmenistan', emoji: '🇹🇲' },
  { value: 'TN', label: 'Tunisia', emoji: '🇹🇳' },
  { value: 'TO', label: 'Tonga', emoji: '🇹🇴' },
  { value: 'TR', label: 'Türkiye', emoji: '🇹🇷' },
  { value: 'TT', label: 'Trinidad and Tobago', emoji: '🇹🇹' },
  { value: 'TV', label: 'Tuvalu', emoji: '🇹🇻' },
  { value: 'TW', label: 'Taiwan', emoji: '🇹🇼' },
  { value: 'TZ', label: 'Tanzania', emoji: '🇹🇿' },
  { value: 'UA', label: 'Ukraine', emoji: '🇺🇦' },
  { value: 'UG', label: 'Uganda', emoji: '🇺🇬' },
  { value: 'US', label: 'United States', emoji: '🇺🇸' },
  { value: 'UY', label: 'Uruguay', emoji: '🇺🇾' },
  { value: 'UZ', label: 'Uzbekistan', emoji: '🇺🇿' },
  { value: 'VA', label: 'Vatican City', emoji: '🇻🇦' },
  { value: 'VC', label: 'Saint Vincent and the Grenadines', emoji: '🇻🇨' },
  { value: 'VE', label: 'Venezuela', emoji: '🇻🇪' },
  { value: 'VG', label: 'British Virgin Islands', emoji: '🇻🇬' },
  { value: 'VI', label: 'U.S. Virgin Islands', emoji: '🇻🇮' },
  { value: 'VN', label: 'Vietnam', emoji: '🇻🇳' },
  { value: 'VU', label: 'Vanuatu', emoji: '🇻🇺' },
  { value: 'WF', label: 'Wallis and Futuna', emoji: '🇼🇫' },
  { value: 'WS', label: 'Samoa', emoji: '🇼🇸' },
  { value: 'YE', label: 'Yemen', emoji: '🇾🇪' },
  { value: 'YT', label: 'Mayotte', emoji: '🇾🇹' },
  { value: 'ZA', label: 'South Africa', emoji: '🇿🇦' },
  { value: 'ZM', label: 'Zambia', emoji: '🇿🇲' },
  { value: 'ZW', label: 'Zimbabwe', emoji: '🇿🇼' },
]

const ITEM_SIZE = 32
const VIEWPORT_ITEMS = 10
const OVERSCAN = 10

@Component({
  selector: 'combobox-virtualized-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkComboboxRoot,
    ArkComboboxLabel,
    ArkComboboxControl,
    ArkComboboxInput,
    ArkComboboxTrigger,
    ArkComboboxPositioner,
    ArkComboboxContent,
    ArkComboboxItem,
    ArkComboboxItemText,
    ArkComboboxItemIndicator,
  ],
  template: `
    <div
      arkComboboxRoot
      #root="arkComboboxRoot"
      [collection]="collection()"
      [scrollToIndexFn]="scrollToIndex"
      (inputValueChange)="onInputValueChange($event)"
    >
      <span arkComboboxLabel>Country</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Germany" />
        <button arkComboboxTrigger (click)="reset()">▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            <div
              #scroller
              class="combobox-virtual-scroller"
              [style.--total-size]="totalSize() + 'px'"
              (scroll)="onScroll($event)"
            >
              <div class="combobox-virtual-spacer" [style.height.px]="totalSize()">
                @for (virtualItem of virtualItems(); track virtualItem.item.value) {
                  <div
                    arkComboboxItem
                    class="combobox-virtual-item"
                    [item]="virtualItem.item"
                    [attr.aria-setsize]="collection().size"
                    [attr.aria-posinset]="virtualItem.index + 1"
                    [style.height.px]="itemSize"
                    [style.transform]="translateY(virtualItem.index)"
                  >
                    <span arkComboboxItemText>
                      <span aria-hidden="true" style="margin-right: 8px">{{ virtualItem.item.emoji }}</span>
                      {{ virtualItem.item.label }}
                    </span>
                    <span arkComboboxItemIndicator>✓</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxVirtualizedExample {
  readonly scroller = viewChild<ElementRef<HTMLDivElement>>('scroller')
  readonly itemSize = ITEM_SIZE
  readonly scrollTop = signal(0)
  readonly items = signal<Country[]>(countries)
  readonly collection = computed<ListCollection<Country>>(() => createListCollection<Country>({ items: this.items() }))
  readonly totalSize = computed(() => this.collection().size * ITEM_SIZE)
  readonly virtualItems = computed<VirtualItem[]>(() => {
    const collection = this.collection()
    const startIndex = Math.max(0, Math.floor(this.scrollTop() / ITEM_SIZE) - OVERSCAN)
    const endIndex = Math.min(collection.size, startIndex + VIEWPORT_ITEMS + OVERSCAN * 2)
    return collection.items.slice(startIndex, endIndex).map((item, offset) => ({ index: startIndex + offset, item }))
  })

  readonly scrollToIndex = (details: ComboboxScrollToIndexDetails): void => {
    const scroller = this.scroller()?.nativeElement
    if (!scroller) return
    scroller.scrollTop = Math.max(0, details.index * ITEM_SIZE - (VIEWPORT_ITEMS * ITEM_SIZE) / 2)
  }

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const items = countries.filter((item) => item.label.toLowerCase().startsWith(query))
    this.items.set(items)
    this.scrollTop.set(0)
    const scroller = this.scroller()?.nativeElement
    if (scroller) scroller.scrollTop = 0
  }

  onScroll(event: Event): void {
    this.scrollTop.set((event.target as HTMLDivElement).scrollTop)
  }

  reset(): void {
    this.items.set(countries)
    this.scrollTop.set(0)
    const scroller = this.scroller()?.nativeElement
    if (scroller) scroller.scrollTop = 0
  }

  translateY(index: number): string {
    return `translateY(${index * ITEM_SIZE}px)`
  }
}
