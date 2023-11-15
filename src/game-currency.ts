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
  return currencyConfigurationMapRaw[input as GameCurrency].currencyName
}

function currencyClass(input: CurrencyInput): GameCurrencyClass {
  return currencyConfigurationMapRaw[input as GameCurrency].currencyClass
}

function currencyCode(input: CurrencyInput): GameCurrency {
  return currencyConfigurationMapRaw[input as GameCurrency].currencyCode
}

function currencyDisplayCode(input: CurrencyInput): string {
  return currencyConfigurationMapRaw[input as GameCurrency].displayCode
}

function isCashableCurrency(input: CurrencyInput): boolean {
  return currencyConfigurationMapRaw[input as GameCurrency].redeemable
}

function roundDisplayCurrencyAmount({ amount, currency }: GameCurrencyRoundParams): number {
  const { displayFractionDigits } = currencyConfigurationMapRaw[currency as GameCurrency]
  return new Decimal(amount).toDecimalPlaces(displayFractionDigits, Decimal.ROUND_FLOOR).toNumber()
}

function formatCurrencyAmount({
  currency,
  amount,
  display,
  trailingCode,
  displaySign,
}: GameCurrencyFormatParams): string {
  const { displayFractionDigits } = currencyConfigurationMapRaw[currency as GameCurrency]

  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: displayFractionDigits,
    signDisplay: 'never',
  })

  amount = roundDisplayCurrencyAmount({ amount, currency })

  const formattedValue = amount.toLocaleString(undefined, {
    minimumFractionDigits: displayFractionDigits,
    maximumFractionDigits: displayFractionDigits,
    signDisplay: displaySign ? 'exceptZero' : 'auto',
  })

  const trailing =
    display === 'name'
      ? currencyName(currency)
      : display === 'code' || trailingCode
      ? currencyDisplayCode(currency)
      : ''

  return !!trailing ? `${formattedValue} ${trailing}` : formattedValue
}

const gameCurrency = {
  currencyName,
  currencyClass,
  currencyCode,
  currencyDisplayCode,
  isCashableCurrency,
  roundDisplayCurrencyAmount,
  formatCurrencyAmount,
}

export { gameCurrency }
