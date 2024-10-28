import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface LodingButtonProps extends ButtonProps {
  loding: boolean;
}

export default function LodingButton({
  loding,
  disabled,
  className,
  ...props
}: LodingButtonProps) {
  return (
    <Button
      disabled={loding || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loding && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}
