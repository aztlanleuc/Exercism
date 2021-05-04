//
// This is only a SKELETON file for the 'Bank Account' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class BankAccount {
  constructor() {
    this._balance;
    this._open;
  }

  open() {
    if (this._open) {
      throw new ValueError;
    } else {
      this._open = true;
      this._balance = 0;
    }
  }

  close() {
    if (this._open) {
      this._open = false;
    } else {
      throw new ValueError;
    }
  }

  deposit(num) {
    if (this._open) {
      if (num > 0) {
        this._balance += num;
      } else {
        throw new ValueError;
      }
    }
    else {
      throw new ValueError;
    }
  }

  withdraw(num) {
    if (this._open) {
      if (num <= this._balance && num > 0) {
        this._balance -= num;
      } else {
        throw new ValueError;
      }
    }
    else {
      throw new ValueError;
    }
  }

  get balance() {
    if (this._open) {
      return this._balance;
    }
    else {
      throw new ValueError;
    }
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
