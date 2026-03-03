const USD_TO_LKR = 320;

export function toLkrAmount(amount: number, currency?: string) {
  if (currency === "LKR") {
    return amount;
  }

  return Math.round(amount * USD_TO_LKR);
}

export function formatLkr(amount: number) {
  try {
    return `LKR ${new Intl.NumberFormat("en-LK", {
      maximumFractionDigits: 0,
    }).format(amount)}`;
  } catch {
    return `LKR ${amount}`;
  }
}
