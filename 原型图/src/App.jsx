import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import { defaultRoute, flatMenus } from "./config/menuConfig.js";

const pageModules = import.meta.glob("./pages/**/*.jsx");

function LazyPage({ file }) {
  const importer = pageModules[`./pages/${file}.jsx`];
  const Page = lazy(importer);

  return (
    <Suspense fallback={<div className="loading-card">页面加载中...</div>}>
      <Page />
    </Suspense>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to={defaultRoute} replace />} />
        {flatMenus.map((item) => (
          <Route key={item.path} path={item.path} element={<LazyPage file={item.file} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  );
}
