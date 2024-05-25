import { BalanceDirective } from "./BalanceDirective";
import { BeanMeta } from "./BeanMeta";
import { BeanRecords } from "./BeanRecords";
import { ToString, blockIndent } from "./utils/utils";

export type BeanTransaction<
  TBeanMeta extends BeanMeta = BeanMeta,
  TBeanRecords extends BeanRecords = BeanRecords
> = {
  src?: string;
  comment?: string;
  date: string;
  payee: string;
  narration: string;
  records: TBeanRecords;
  meta?: TBeanMeta;
};
export function BeanTransaction<T extends BeanTransaction>(trx: T) {
  return Object.assign(trx, ToString(stringify(trx)))
}
function stringify({ src, date, meta, records, narration, payee, comment }: BeanTransaction) {
  const $src = !src ? null : `; ${src}`
  const $comment = !comment ? '' : ` ; ${comment}`
  const s = [
    // src comment
    $src,
    // balance begin
    meta?.balance_begin && BalanceDirective(date, records[0].account, meta.balance_begin),

    `${date} * "${payee}" "${narration}"${$comment}`,
    !meta ? null : blockIndent(2, BeanMeta(meta)),
    !records ? null : blockIndent(2, BeanRecords(records)),
  ].flatMap(e => e ? [e] : []).join('\n');
  return s;
}

