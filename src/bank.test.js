import { Bank } from './bank'
import { describe, afterEach, test, expect, vitest } from 'vitest'

describe('Acceptance test', () => {
  afterEach(() => {
    vitest.useRealTimers()
  })

  test('Should print correct statement', () => {
    const spyConsoleLog = vitest.spyOn(console, 'log')
    const bank = new Bank([])

    vitest.useFakeTimers()
    vitest.setSystemTime(new Date('2012-01-10'))
    bank.deposit(1000)
    vitest.setSystemTime(new Date('2012-01-13'))
    bank.deposit(2000)
    vitest.setSystemTime(new Date('2012-01-14'))
    bank.withdraw(500)

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
})
