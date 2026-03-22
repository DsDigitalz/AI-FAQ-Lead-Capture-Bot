import { useEffect, useState } from "react";
import toast from "react-hot-toast";

let offlineToastId = null;

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);

      if (!offlineToastId) {
        offlineToastId = toast.error("No internet connection", {
          duration: Infinity,
          id: "offline-toast",
        });
      }
    };

    const handleOnline = () => {
      setIsOnline(true);

      if (offlineToastId) {
        toast.dismiss("offline-toast");
        toast.success("Back online");
        offlineToastId = null;
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return isOnline;
}
