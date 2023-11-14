import React from 'react';
import Lottie from 'react-lottie';
import animationData from "../../public/images/json/logo.json";

const AnimatedLogo = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={100}
                width={100} />
        </div>
    );
};

export default AnimatedLogo;