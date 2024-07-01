export enum GameCurrency {
  Bits = 'XBT',
  Bucks = 'XBK',
  GoldCoins = 'XGC',
  SweepsCoins = 'XSC',
}

export enum GameCurrencyClass {
  Standard = 'standard',
  Promotional = 'promotional',
}

export type CurrencyInput = GameCurrency | string

export type GameCurrencyRoundParams = {
  /** game currency code */
  currency: CurrencyInput
  /** game currency amount */
  amount?: number
  /** display all fraction digits */
  fullFractionDigits?: boolean
}

export type GameCurrencyFormatParams = GameCurrencyRoundParams & {
  /** mustache template. (default: "{{currencyValue}} {{currencyDisplay}}") */
  displayTemplate?: string
  /** always display sign  */
  displaySign?: boolean
  /** game currency suffix display: code, name or none. (default: none) */
  display?: 'code' | 'name'
  /** return empty string for zero values  */
  hideZero?: boolean
  /** uppercase result */
  uppercase?: boolean
  /** display minimum possible number of fraction digits */
  trimFractionDigits?: boolean
}
