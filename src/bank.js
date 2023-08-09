/**
 * @typedef {{date: Date; amount: number; balance: number;}} Transaction
 */

export class Bank {
  /**
   * @type {Transaction[]}
   */
  _listOfTx = []
  /**
   * @type {number}
   */
  _balance = 0

  /**
   * @param {Transaction[]} initialListOfTx
   */
  constructor(initialListOfTx) {
    this._listOfTx = initialListOfTx
  }

  /**
   * @param {number} amount
   */
  deposit(amount) {
    this._balance += amount

    this._listOfTx.unshift({
      date: new Date(),
      amount: amount,
      balance: this._balance,
    })
  }

  /**
   * @param {number} amount
   */
  withdraw(amount) {
    this._balance -= amount

    this._listOfTx.unshift({
      date: new Date(),
      amount: -amount,
      balance: this._balance,
    })
  }

  printStatement = () => {
    /**
     * @param {Date} date
     */
    const formatDateString = (date) =>
      `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`

    console.log(
      'Date       || Amount || Balance\n' +
        this._listOfTx
          .map(
            (tx) =>
              `${formatDateString(tx.date)} || ${tx.amount}   || ${tx.balance}`
          )
          .join('\n')
    )
  }
}
