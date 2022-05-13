class LateFee {
  static calculateLateFeeBill(delay: number, amount: number): number {
    return delay * amount;
  }
}

export { LateFee };
