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

export type GameCurrencyFormatParams = {
  currency: CurrencyInput
  amount?: number
  displaySign?: boolean
  display?: 'code' | 'name'
  hideZero?: boolean
}
