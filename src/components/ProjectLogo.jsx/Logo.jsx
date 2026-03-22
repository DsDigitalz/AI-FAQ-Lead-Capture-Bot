// import { Shield, Zap } from "lucide-react";
import { Shield, Zap } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import HideLogo from "./Logo1";

export default function Logo({ disableLink = false }) {
  const HelplyAILogo = ({ className = "w-8 h-8" }) => (
    <div className={`relative ${className}`}>
      {/* Shield Icon: Represents help and protection */}
      <Shield className="w-full h-full text-white" strokeWidth={1.5} />
      {/* Zap Icon: Represents intelligence and speed */}
      <Zap
        className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2 "
        strokeWidth={0}
      />
    </div>
  );

  const logoContent = (
    <div className="flex items-center space-x-2  md:px-0 font-medium">
      <HelplyAILogo className="w-7 h-7" />

      <h1 className="text-lg sm:text-xl  font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400">
          Helply
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-400 font-bold italic">
          AI
        </span>
      </h1>
      <HideLogo />
    </div>
  );

  if (disableLink) {
    return logoContent;
  }

  return <Link to="/">{logoContent}</Link>;
}
