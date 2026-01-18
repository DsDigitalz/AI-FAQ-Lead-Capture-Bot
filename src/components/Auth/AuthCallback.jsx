import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import toast from "react-hot-toast";


export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        toast.error("Authentication failed. Please try again.");
        navigate("/signin");
        return;
      }

      toast.success("Signed in successfully!");
      navigate("/dashboard", { replace: true });
    };

    handleAuth();
  }, [navigate]);

  return null; // No UI needed
}
