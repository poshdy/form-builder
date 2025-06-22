import { cn } from "@/lib/utils";
import { AiOutlineLoading } from "react-icons/ai";
export const Loader = ({
  className,
  size = 25,
}: {
  className: string;
  size: number;
}) => {
  return (
    <div className={cn("w-full", className)}>
      <AiOutlineLoading className="animate-spin text-zinc-200" size={size} />
    </div>
  );
};
