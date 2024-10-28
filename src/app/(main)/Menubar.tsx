import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Bell, Bookmark, Home, Mail } from "lucide-react"
import Link from "next/link"

interface MenuBarProps{
    className?:string
}

export default function Menubar({className}:MenuBarProps) {
  return (
    <div className={className}>
        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
        >
            <Link href="/">
            <Home className="!size-6"/>
            <span className="hidden lg:inline font-bold">Home</span>
            </Link>

        </Button>
        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
        >
            <Link href="/notifications" >
            <Bell className="!size-6"/>
            <span className="hidden lg:inline font-bold">Notifications</span>
            </Link>

        </Button>
        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
        >
            <Link href="/messages">
            <Mail className="!size-6"/>
            <span className="hidden lg:inline font-bold">Messages</span>
            </Link>

        </Button>
        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
        >
            <Link href="/bookmarks">
            <Bookmark className="!size-6"/>
            <span className="hidden lg:inline font-bold">Bookmarks</span>
            </Link>

        </Button>
    </div>
  )
}
