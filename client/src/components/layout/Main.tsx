import { Routes, Route } from "react-router-dom"; 
import Dashboard from "../../pages/DashboardPage"; 
import WallPaper from "../../pages/WallPaper"; 

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallpaper" element={<WallPaper />} />
      </Routes>
    </main>
  );
};

export default Main;
