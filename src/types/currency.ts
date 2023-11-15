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
  currency: CurrencyInput
  amount: number
}

export type GameCurrencyFormatParams = GameCurrencyRoundParams & {
  /** @deprecated use 'display' field */
  trailingCode?: boolean
  displaySign?: boolean
  display?: 'code' | 'name'
}
