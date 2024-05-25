import type { StringLike } from "bun";
import { toPairs } from "rambda";
import { ToString } from "./utils/utils";

export type BeanMeta = Record<string, StringLike>;
export function BeanMeta(meta: BeanMeta) {
  return { ...meta, ...ToString(metaStringify(meta)) };
}

function metaStringify(meta: BeanMeta) {
  return toPairs(meta)
    .map(
      ([key, value]) => `${key}: ${typeof value === "string" ? JSON.stringify(value) : String(value)}`
    )
    .join("\n");
}

if (import.meta.main) {
  console.log(String(BeanMeta({ num: 1.0, string: '2', cash: { toString: () => '30 USD' }, date: new Date('2024-01-01').toISOString().slice(0, 10) })))
}