
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ReCAPTCHABox({ onChange }) {
  return (
    <div className="flex justify-center mt-4">
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // ✅ store in .env
        onChange={onChange}
        theme="dark" // keeps your dark UI consistent
      />
    </div>
  );
}
