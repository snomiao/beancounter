import { BeanMeta } from "./BeanMeta";
import { ToString, blockIndent } from "./utils/utils";

export type BeanRecord = {
  account: string;
  amount: number;
  currency: string;
  meta?: BeanMeta,
  comment?: string
};
export type BeanRecords = BeanRecord[];
export function BeanRecords(
  records: BeanRecords
) {
  return Object.assign(records, ToString(stringify(records)));
}

function stringify(records: BeanRecords): string {
  return records
    .flatMap(
      ({ account, amount, currency, meta, comment }) => {
        const $meta = meta ? blockIndent(2, BeanMeta(meta)) + '\n' : '';
        const $comment = !comment ? '' : ' ; ' + comment;
        return [`${account}\t\t${amount.toFixed(2)} ${currency}${$comment}`, $meta];
      }
    ).filter(Boolean)
    .join("\n");
}

