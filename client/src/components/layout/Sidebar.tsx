import homeIcon from "@/assets/icons/home.png";
import settingIcon from "@/assets/icons/setting.png";
import {
  Sidebar as SSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const Sidebar = () => {
  return (
    <SSidebar collapsible="icon">
      <SidebarContent className="mt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { name: "Dashboard", icon: homeIcon, url: "/" },
                { name: "Budget", icon: settingIcon, url: "/budget" },
              ].map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild tooltip={item.name}>
                    <a href={item.url} className="flex items-center gap-3 py-6">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="h-5 w-5 object-contain"
                      />
                      <span className="group-data-[collapsible=icon]:hidden font-medium">
                        {item.name}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SSidebar>
  );
};

export default Sidebar;