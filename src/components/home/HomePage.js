import React from "react";
import Wallpaper from "./Wallpaper";
import QuickSearch from "./QuickSearch";

function HomePage() {
  return (
    <>
      <main className="container-fluid">
        <Wallpaper />
        <QuickSearch />
      </main>
    </>
  );
}

export default HomePage;
