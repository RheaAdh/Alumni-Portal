import React from "react";
import Lottie from "react-lottie";
import animation from "../../assets/animations/404.json";
import { lottieOptions } from "../../utils/utilities";

export default function NotFound() {
    return (
        <div className="not-found">
            <Lottie
                options={lottieOptions(animation)}
                height={300}
                width={350}
            />
            <h1>Page not found</h1>
        </div>
    );
}
