import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format as formatDate, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(from:Date | string){
  
  const dateFrom = new Date(from);  // Ensure `from` is a Date instance
  const currentDate = new Date();

  if (currentDate.getTime() - dateFrom.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(dateFrom, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === dateFrom.getFullYear()) {
      return formatDate(dateFrom, "MMM d");
    } else {
      return formatDate(dateFrom, "MMM d, yyyy");
    }
  }
}