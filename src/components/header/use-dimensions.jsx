import { useEffect, useRef, useState } from "react";

const useDimensions = (ref) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (ref.current) {
                setDimensions({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight,
                });
            }
        };

        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [ref]);

    return dimensions;
};

export default useDimensions;
