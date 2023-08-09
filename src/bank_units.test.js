import { Bank } from './bank'
import { describe, test, afterEach, expect, vitest } from 'vitest'

/**
 * @typedef {import('./bank').Transaction} Transaction
 */

describe('Unit tests', () => {
  afterEach(() => {
    vitest.useRealTimers()
  })

  test('printStatement prints whatever the transaction records is', () => {
    const spyConsoleLog = vitest.spyOn(console, 'log')
    /**
     * @type {Transaction[]}
     */
    const mockListOfTx = [
      {
        date: new Date('2012-01-14'),
        amount: -500,
        balance: 2500,
      },
      {
        date: new Date('2012-01-13'),
        amount: 2000,
        balance: 3000,
      },
      {
        date: new Date('2012-01-10'),
        amount: 1000,
        balance: 1000,
      },
    ]

    const bank = new Bank(mockListOfTx)
    bank.printStatement()
    expect(spyConsoleLog).toHaveBeenCalledWith(
      [
        'Date       || Amount || Balance',
        '14/01/2012 || -500   || 2500',
        '13/01/2012 || 2000   || 3000',
        '10/01/2012 || 1000   || 1000',
      ].join('\n')
    )
  })
  test('Deposit should add new record', () => {
    vitest.useFakeTimers()
    vitest.setSystemTime(new Date('2012-01-10'))

    /**
     * @type {Transaction[]}
     */
    const mockListOfTx = []
    const bank = new Bank(mockListOfTx)

    bank.deposit(1000)

    expect(mockListOfTx).toEqual([
      {
        date: new Date('2012-01-10'),
        amount: 1000,
        balance: 1000,
      },
    ])
  })
  test('Withdraw should add new record', () => {
    vitest.useFakeTimers()
    vitest.setSystemTime(new Date('2012-01-14'))

    /**
     * @type {Transaction[]}
     */
    const mockListOfTx = []
    const bank = new Bank(mockListOfTx)

    bank.withdraw(500)

    expect(mockListOfTx).toEqual([
      {
        date: new Date('2012-01-14'),
        amount: -500,
        balance: -500,
      },
    ])
  })
})
