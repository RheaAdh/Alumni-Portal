import React from "react";
import animation from "../assets/animations/loading.json";
import { lottieOptions } from "../utils/utilities";
import Lottie from "react-lottie";

export default function Loading() {
    return (
        <div className="loading">
            <Lottie
                options={lottieOptions(animation)}
                height={250}
                width={250}
            />
        </div>
    );
}
