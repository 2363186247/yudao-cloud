import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "../components/AppHeader.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SideMenu from "../components/SideMenu.jsx";
import { getModuleByPath, getPageByPath } from "../config/menuConfig.js";

export default function MainLayout() {
  const location = useLocation();
  const currentModule = getModuleByPath(location.pathname);
  const currentPage = getPageByPath(location.pathname);

  return (
    <div className="app-shell">
      <AppHeader currentModuleKey={currentModule.key} />
      <div className="app-body">
        <SideMenu moduleItem={currentModule} activePath={currentPage.path} />
        <main className="main-content">
          {!currentPage.hidePageHeader ? (
            <PageHeader moduleTitle={currentModule.title} pageTitle={currentPage.title} description={currentPage.description} />
          ) : null}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
