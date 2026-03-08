import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import AppSidebar from "./AppSidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
