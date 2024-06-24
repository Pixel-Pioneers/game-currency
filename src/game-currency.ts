import Decimal from 'decimal.js'
import { currencyConfigurationMapRaw } from './map'
import {
  CurrencyInput,
  GameCurrency,
  GameCurrencyClass,
  GameCurrencyFormatParams,
  GameCurrencyRoundParams,
} from './types'

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

function roundDisplayCurrencyAmount({ amount, currency }: GameCurrencyRoundParams): number {
  const { displayFractionDigits = 0 } = currencyConfigurationMapRaw[currency as GameCurrency] || {}
  return new Decimal(amount || 0).toDecimalPlaces(displayFractionDigits, Decimal.ROUND_FLOOR).toNumber()
}

function formatCurrencyAmount({ currency, amount, display, displaySign, hideZero }: GameCurrencyFormatParams): string {
  const { displayFractionDigits = 0 } = currencyConfigurationMapRaw[currency as GameCurrency] || {}

  amount = amount || 0

  amount = roundDisplayCurrencyAmount({ amount, currency })

  if (hideZero && amount === 0) {
    return ''
  }

  const formattedValue = amount.toLocaleString(undefined, {
    minimumFractionDigits: displayFractionDigits,
    maximumFractionDigits: displayFractionDigits,
    signDisplay: displaySign ? 'exceptZero' : 'auto',
  })

  const trailing = display === 'name' ? currencyName(currency) : display === 'code' ? currencyDisplayCode(currency) : ''

  return !!trailing ? `${formattedValue} ${trailing}` : formattedValue
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
