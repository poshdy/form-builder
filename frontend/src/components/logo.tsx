import { Zap } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold gradient-text">FormCraft</span>
    </div>
  );
};
