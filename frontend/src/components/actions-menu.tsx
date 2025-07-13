import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

export type MenuItems = {
  disable?: boolean;
  label: React.ReactNode | string;
  icon?: React.ReactNode;
  danger?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

type ActionsProps = {
  className?: string;
  items: MenuItems[];
  trigger?: React.ReactNode;
};

export const ActionsMenu = ({
  className,
  items,
  trigger = <MoreVertical />,
}: ActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className}>
        {items.map((item) => (
          <DropdownMenuItem
            disabled={item.disable}
            className={
              item.danger
                ? `text-red-900 bg-red-500 font-semibold ${item.className}`
                : item.className
            }
            onClick={item.onClick}
          >
            {item.icon ? (
              <div className="flex items-center gap-2">
                {item.icon} {item.label}
              </div>
            ) : (
              item.label
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
