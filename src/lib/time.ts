export function addDuration(duration: string, from = new Date()) {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) {
    const fallback = new Date(from);
    fallback.setDate(fallback.getDate() + 30);
    return fallback;
  }
  const value = Number(match[1]);
  const unit = match[2];
  const date = new Date(from);
  if (unit === "s") date.setSeconds(date.getSeconds() + value);
  if (unit === "m") date.setMinutes(date.getMinutes() + value);
  if (unit === "h") date.setHours(date.getHours() + value);
  if (unit === "d") date.setDate(date.getDate() + value);
  return date;
}
