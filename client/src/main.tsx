import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Sidebar from "./components/layout/Sidebar";
import "./index.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider delayDuration={0}>
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 border-l">
                <Main />
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </StrictMode>,
);
