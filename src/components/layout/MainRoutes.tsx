import { Routes, Route } from "react-router-dom";
import Projects from "@/pages/projects/Projects";
import { ProjectDetails } from "@/pages/projects/ProjectDetails";
import UserProfile from "@/pages/users/UserProfile";
import Users from "@/pages/users/Users";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/users" element={<Users />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/users/:id" element={<UserProfile />} />
    </Routes>
  );
} 