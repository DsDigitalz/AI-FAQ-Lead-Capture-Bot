export const isNetworkError = (error) => {
  return (
    !navigator.onLine ||
    error?.message?.includes("Failed to fetch") ||
    error?.message?.includes("NetworkError") ||
    error?.status === 0
  );
};
