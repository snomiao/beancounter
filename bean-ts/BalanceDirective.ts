import { ToString } from "./utils/utils";

export function BalanceDirective(
  date: string | Date,
  account: string,
  balance?: { toString: () => string } | string
) {
  if (!balance) return "";
  const $date = new Date(date)
    .toISOString()
    .slice(0, 10);
  const s = `${$date} balance ${account} ${balance}`;
  return ToString(s);
}
