import Decimal from 'decimal.js'
import { currencyConfigurationMapRaw } from './map'
import {
  CurrencyInput,
  GameCurrency,
  GameCurrencyClass,
  GameCurrencyFormatParams,
  GameCurrencyRoundParams,
} from './types'
import Mustache = require('mustache')

function currencyName(input: CurrencyInput): string {
  return currencyConfigurationMapRaw[input as GameCurrency]?.currencyName || input
}

function currencyClass(input: CurrencyInput): GameCurrencyClass {
  return currencyConfigurationMapRaw[input as GameCurrency]?.currencyClass || GameCurrencyClass.Standard
}

function currencyCode(input: CurrencyInput): GameCurrency {
  return currencyConfigurationMapRaw[input as GameCurrency]?.currencyCode || input
}

function currencyDisplayCode(input: CurrencyInput): string {
  return currencyConfigurationMapRaw[input as GameCurrency]?.displayCode || input
}

function isCurrency(input: CurrencyInput): input is GameCurrency {
  return !!currencyConfigurationMapRaw[input as GameCurrency]
}

function isCashableCurrency(input: CurrencyInput): boolean {
  return !!currencyConfigurationMapRaw[input as GameCurrency]?.redeemable
}

function roundDisplayCurrencyAmount({ amount, currency, fullFractionDigits }: GameCurrencyRoundParams): number {
  const { displayFractionDigits = 2, storeFractionDigits = 4 } =
    currencyConfigurationMapRaw[currency as GameCurrency] || {}
  return new Decimal(amount || 0)
    .toDecimalPlaces(!fullFractionDigits ? displayFractionDigits : storeFractionDigits, Decimal.ROUND_FLOOR)
    .toNumber()
}

const defaultTemplate = '{{currencyValue}} {{currencyDisplay}}'
// prebuild template on startup
Mustache.parse(defaultTemplate)

function formatCurrencyAmount({
  currency,
  amount,
  display,
  displaySign,
  displayTemplate,
  hideZero,
  uppercase,
  trimFractionDigits,
  fullFractionDigits,
}: GameCurrencyFormatParams): string {
  const { displayFractionDigits = 2, storeFractionDigits = 4 } =
    currencyConfigurationMapRaw[currency as GameCurrency] || {}

  amount = amount || 0

  amount = roundDisplayCurrencyAmount({ amount, currency, fullFractionDigits })

  if (hideZero && amount === 0) {
    return ''
  }

  const formattedValue = amount.toLocaleString(undefined, {
    minimumFractionDigits: !trimFractionDigits ? displayFractionDigits : 0,
    maximumFractionDigits: storeFractionDigits,
    signDisplay: displaySign ? 'exceptZero' : 'auto',
  })

  let currencyDisplay =
    display === 'name' ? currencyName(currency) : display === 'code' ? currencyDisplayCode(currency) : ''

  const result = Mustache.render(displayTemplate ?? defaultTemplate, {
    currencyValue: formattedValue,
    currencyDisplay,
  }).trim()

  return uppercase ? result.toLocaleUpperCase() : result
}

const gameCurrency = {
  currencyName,
  currencyClass,
  currencyCode,
  currencyDisplayCode,
  isCurrency,
  isCashableCurrency,
  roundDisplayCurrencyAmount,
  formatCurrencyAmount,
}

export { gameCurrency }
