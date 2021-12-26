import React from "react";
import Lottie from "lottie-web";
import animation from "../assets/animations/404.json";
import { lottieOptions } from "../utils/utilities";
import Nav from "../components/Nav";
export default function NotFound() {
  return (
    <div>
      <Nav />
      <div className="not-found">
        <Lottie options={lottieOptions(animation)} height={300} width={350} />
        <h1>Page not found</h1>
      </div>
    </div>
  );
}
