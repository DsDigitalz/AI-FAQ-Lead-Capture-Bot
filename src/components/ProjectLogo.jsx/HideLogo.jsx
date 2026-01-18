import { Link, Shield, Zap } from "lucide-react";
import React from "react";

export default function HideLogo() {
  const HelplyAILogo = ({ className = "w-8 h-8" }) => (
    <div className={`relative ${className}`}>
      {/* Shield Icon: Represents help and protection */}
      <Shield className="w-full h-full text-white" strokeWidth={1.5} />
      {/* Zap Icon: Represents intelligence and speed */}
      <Zap
        className="absolute top-1/2 left-1/2 w-3 h-3 text-fuchsia-400 fill-fuchsia-400 transform -translate-x-1/2 -translate-y-1/2"
        strokeWidth={0}
      />
    </div>
  );
  return (
    <div className="flex items-center space-x-2  md:px-0 font-medium">
      <Link to="/">
        <HelplyAILogo className="w-7 h-7" />
      </Link>
    </div>
  );
}
