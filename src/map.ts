import { GameCurrency, GameCurrencyClass } from './types/currency'

/** NEVER change these values as it may have a knock on effect breaking connected systems */

type CurrencyConfiguration = {
  currencyCode: GameCurrency
  displayCode: string
  currencyName: string
  currencyClass: GameCurrencyClass
  displayFractionDigits: number
  storeFractionDigits: number
  redeemable: boolean
}

const currencyConfigurationMapRaw: Record<GameCurrency, CurrencyConfiguration> = {
  [GameCurrency.GoldCoins]: {
    currencyCode: GameCurrency.GoldCoins,
    displayCode: 'GC',
    currencyName: 'Gold',
    currencyClass: GameCurrencyClass.Standard,
    displayFractionDigits: 0,
    storeFractionDigits: 2,
    redeemable: false,
  },
  [GameCurrency.SweepsCoins]: {
    currencyCode: GameCurrency.SweepsCoins,
    displayCode: 'SC',
    currencyName: 'Sweeps',
    currencyClass: GameCurrencyClass.Promotional,
    displayFractionDigits: 2,
    storeFractionDigits: 4,
    redeemable: true,
  },
  [GameCurrency.Bits]: {
    currencyCode: GameCurrency.Bits,
    displayCode: 'BT',
    currencyName: 'Bits',
    currencyClass: GameCurrencyClass.Standard,
    displayFractionDigits: 0,
    storeFractionDigits: 2,
    redeemable: false,
  },
  [GameCurrency.Bucks]: {
    currencyCode: GameCurrency.Bucks,
    displayCode: 'BK',
    currencyName: 'Bucks',
    currencyClass: GameCurrencyClass.Promotional,
    displayFractionDigits: 2,
    storeFractionDigits: 4,
    redeemable: true,
  },
}

export { currencyConfigurationMapRaw }
