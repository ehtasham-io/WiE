// Formats a Sanity `date` field (YYYY-MM-DD) into "October 12, 2024".
// Returns "TBA" if no date is set.
export function formatEventDate(isoDate?: string | null): string {
  if (!isoDate) return "TBA";
  const d = new Date(`${isoDate}T00:00:00`);
  if (isNaN(d.getTime())) return "TBA";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
