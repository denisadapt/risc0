import "server-only";

import type { CratesIoValidationTableSchema } from "../_components/crates-io-validation-table-schema";

export async function fetchCratesValidationResults({
  hash,
}: { hash: string }): Promise<CratesIoValidationTableSchema[]> {
  const response = await fetch(
    `https://raw.githubusercontent.com/risc0/ghpages/main/dev/crate-validation/results/${hash}.json`,
    {
      next: { revalidate: 180 }, // 3 minutes cache
    },
  );
  const responseJson = await response.json();

  return responseJson;
}
