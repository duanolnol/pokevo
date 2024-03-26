import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <main className="flex justify-center">
    <div className="w-full h-screen flex flex-col items-center dark:bg-gray-900 bg-slate-200 overflow-y-scroll">
      {children}
    </div>
  </main>
);

export default Layout;
