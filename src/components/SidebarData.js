import React from "react";
import home from "../assets/home.svg";
import face from "../assets/face.svg";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <img src={home} alt="" />
  },
  {
    title: "About Me",
    path: "/aboutme",
    icon: <img src={face} alt="" />
  }
];
