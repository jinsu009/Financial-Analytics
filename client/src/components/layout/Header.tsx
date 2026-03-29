import { SidebarTrigger } from "@/components/ui/sidebar"

const Header: React.FC = () => {
    return (
      <header className="flex h-14 w-full shrink-0 items-center border-b bg-white px-4 z-50">
        <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-bold">💰 수진의 돈관리</span>
        </div>
    </header>
    )
}

export default Header;