import { provideZonelessChangeDetection } from '@angular/core'
import { getTestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})

getTestBed().configureTestingModule({
  providers: [provideZonelessChangeDetection()],
})
