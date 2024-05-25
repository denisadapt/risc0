import "server-only";

export async function fetchApplicationsBenchmarks({ url, version }: { url: string; version: string }) {
  return fetch(`https://raw.githubusercontent.com/risc0/ghpages/${version}/dev/benchmarks/${url}`, {
    next: { revalidate: 180 }, // 3 minutes cache
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching ${url}: ${response.statusText}`);
      }

      return response.text();
    })
    .catch((error) => {
      console.error(`Failed fetching ${url}:`, error.message);

      return undefined; // Handle individual failures gracefully
    });
}
