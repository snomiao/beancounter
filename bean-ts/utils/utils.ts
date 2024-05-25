import { StringLike } from "bun";

export function blockIndent(deep: number, str: StringLike) {
  return String(str).split('\n').map(line => ' '.repeat(deep) + line).join('\n')
}
export function ToString(s: string) {
  return { toString: () => s, };
}
