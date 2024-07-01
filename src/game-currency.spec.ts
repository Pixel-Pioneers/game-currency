import { expect } from 'chai'
import { GameCurrency, GameCurrencyClass } from './types/currency'
import { gameCurrency } from './game-currency'

describe('Game Currency', () => {
  it('Ensures currencyName', async () => {
    expect(gameCurrency.currencyName('XBT')).to.be.deep.equal('Bits')
    expect(gameCurrency.currencyName('XBK')).to.be.deep.equal('Bucks')

    expect(gameCurrency.currencyName('XXX')).to.be.deep.equal('XXX')
    // expect(() => gameCurrency.currencyName('XXX')).to.throw(Error)
  })

  it('Ensures currencyClass for valid currencies', async () => {
    expect(gameCurrency.currencyClass('XBT')).to.be.deep.equal(GameCurrencyClass.Standard)
    expect(gameCurrency.currencyClass('XBK')).to.be.deep.equal(GameCurrencyClass.Promotional)

    expect(gameCurrency.currencyClass('XXX')).to.be.deep.equal(GameCurrencyClass.Standard)
    // expect(() => gameCurrency.currencyClass('XXX')).to.throw(Error)
  })

  it('Ensures currencyCode', async () => {
    expect(gameCurrency.currencyCode('XBT')).to.be.deep.equal(GameCurrency.Bits)
    expect(gameCurrency.currencyCode('XBK')).to.be.deep.equal(GameCurrency.Bucks)

    expect(gameCurrency.currencyCode('XXX')).to.be.deep.equal('XXX')
    // expect(() => gameCurrency.currencyCode('XXX')).to.throw(Error)
  })

  it('Ensures currencyDisplayCode', async () => {
    expect(gameCurrency.currencyDisplayCode('XBT')).to.be.deep.equal('BT')
    expect(gameCurrency.currencyDisplayCode('XBK')).to.be.deep.equal('BK')

    expect(gameCurrency.currencyDisplayCode('XXX')).to.be.deep.equal('XXX')
    // expect(() => gameCurrency.currencyDisplayCode('XXX')).to.throw(Error)
  })

  it('Ensures isCashableCurrency', async () => {
    expect(gameCurrency.isCashableCurrency('XBT')).to.be.equal(false)
    expect(gameCurrency.isCashableCurrency('XBK')).to.be.equal(true)

    expect(gameCurrency.isCashableCurrency('XXX')).to.be.deep.equal(false)
    // expect(() => gameCurrency.isCashableCurrency('XXX')).to.throw(Error)
  })

  it('Ensures roundDisplayCurrencyAmount for valid currencies', async () => {
    expect(gameCurrency.roundDisplayCurrencyAmount({ currency: 'XBT', amount: 1.99 })).to.be.deep.equal(1)
    expect(gameCurrency.roundDisplayCurrencyAmount({ currency: 'XBK', amount: 1.99 })).to.be.deep.equal(1.99)

    expect(gameCurrency.roundDisplayCurrencyAmount({ currency: 'XXX', amount: 1.99 })).to.be.deep.equal(1.99)
    // expect(() => gameCurrency.roundDisplayCurrencyAmount({ currency: 'XXX', amount: 1.99 })).to.throw(Error)
  })

  it('Ensures formatCurrencyAmount for valid currencies', async () => {
    expect(gameCurrency.formatCurrencyAmount({ currency: 'XBT', amount: 1.99 })).to.be.deep.equal('1')
    expect(
      gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 123456789.99, display: 'code' }),
    ).to.be.deep.equal('123,456,789.99 BK')
    expect(
      gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 123456789.9999, display: 'code' }),
    ).to.be.deep.equal('123,456,789.99 BK')

    expect(gameCurrency.formatCurrencyAmount({ currency: 'XXX', amount: 1.99 })).to.be.deep.equal('1.99')
    // expect(() => gameCurrency.formatCurrencyAmount({ currency: 'XXX', amount: 1.99 })).to.throw(Error)
  })

  it('Ensures formatCurrencyAmount trailing', async () => {
    expect(gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1.999 })).to.be.deep.equal('1.99')
    expect(gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1.999, display: 'code' })).to.be.deep.equal(
      '1.99 BK',
    )
    expect(gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1.999, display: 'name' })).to.be.deep.equal(
      '1.99 Bucks',
    )
  })

  it('Ensures formatCurrencyAmount hide zero', async () => {
    expect(
      gameCurrency.formatCurrencyAmount({
        currency: 'XBK',
        display: 'name',
        uppercase: true,
        displayTemplate: '{{currencyValue}} free {{currencyDisplay}}',
        hideZero: true,
      }),
    ).to.be.deep.equal('')

    expect(
      gameCurrency.formatCurrencyAmount({
        currency: 'XBK',
        amount: 0,
        display: 'name',
        uppercase: true,
        displayTemplate: '{{currencyValue}} free {{currencyDisplay}}',
        hideZero: true,
      }),
    ).to.be.deep.equal('')

    expect(
      gameCurrency.formatCurrencyAmount({
        currency: 'XBK',
        amount: 0.0,
        display: 'name',
        uppercase: true,
        displayTemplate: '{{currencyValue}} free {{currencyDisplay}}',
        hideZero: true,
      }),
    ).to.be.deep.equal('')
  })

  it('Ensures formatCurrencyAmount display template', async () => {
    expect(
      gameCurrency.formatCurrencyAmount({
        currency: 'XBK',
        amount: 1.99,
        display: undefined,
        displayTemplate: '{{currencyValue}} FREE {{currencyDisplay}}',
      }),
    ).to.be.deep.equal('1.99 FREE')

    expect(
      gameCurrency.formatCurrencyAmount({
        currency: 'XBK',
        amount: 1.99,
        display: 'code',
        displayTemplate: '{{currencyValue}} FREE {{currencyDisplay}}',
      }),
    ).to.be.deep.equal('1.99 FREE BK')

    expect(
      gameCurrency.formatCurrencyAmount({
        currency: 'XBK',
        amount: 1.99,
        display: 'name',
        displayTemplate: '{{currencyValue}} FREE {{currencyDisplay}}',
      }),
    ).to.be.deep.equal('1.99 FREE Bucks')
  })

  it('Ensures formatCurrencyAmount uppercase', async () => {
    expect(
      gameCurrency.formatCurrencyAmount({
        currency: 'XBK',
        amount: 1.99,
        display: 'name',
        uppercase: true,
        displayTemplate: '{{currencyValue}} free {{currencyDisplay}}',
      }),
    ).to.be.deep.equal('1.99 FREE BUCKS')
  })

  it('Ensures formatCurrencyAmount trim fraction digits', async () => {
    expect(
      gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1.999, trimFractionDigits: true }),
    ).to.be.deep.equal('1.99')
    expect(
      gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1.9, trimFractionDigits: true }),
    ).to.be.deep.equal('1.9')
    expect(
      gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1, trimFractionDigits: true }),
    ).to.be.deep.equal('1')
  })

  it('Ensures formatCurrencyAmount full fraction digits', async () => {
    expect(
      gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1.99999, fullFractionDigits: true }),
    ).to.be.deep.equal('1.9999')
    expect(
      gameCurrency.formatCurrencyAmount({ currency: 'XBK', amount: 1.9, fullFractionDigits: true }),
    ).to.be.deep.equal('1.90')
  })
})
