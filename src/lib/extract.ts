import { filter, fromPairs, toPairs } from "lodash";
import { StringIndexible } from "@/models/Indexible";

export default function extract<
  T extends { [name: string | number | symbol]: any },
>(src: T, pattern: RegExp, excludePropNames: string[] = []): T {
  return fromPairs(
    filter(
      toPairs(src),
      ([key]) => key.match(pattern) && !excludePropNames.includes(key),
    ),
  );
}
const src = { name: "string" };
extract({ name: "string" }, /ga/);
extract(toPairs(src), /ga/);
