export function getPagination(searchParams: URLSearchParams) {
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("page_size") || 20)));
  const skip = (page - 1) * pageSize;
  return { page, pageSize, skip };
}
