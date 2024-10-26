import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const springConfig = { damping: 3, stiffness: 50, restDelta: 0.001 };

export function useFollowPointer(ref) {
    const xPoint = useMotionValue(0);
    const yPoint = useMotionValue(0);
    const x = useSpring(xPoint, springConfig);
    const y = useSpring(yPoint, springConfig);

    useEffect(() => {
        if (!ref.current) return;

        const handlePointerMove = (e) => {
            const element = ref.current;

            xPoint.set(
                e.clientX - element.offsetLeft - element.offsetWidth / 2
            );
            yPoint.set(
                e.clientY +
                    window.scrollY -
                    element.offsetTop -
                    element.offsetHeight / 2
            );
        };

        window.addEventListener("pointermove", handlePointerMove);

        return () =>
            window.removeEventListener("pointermove", handlePointerMove);
    }, [xPoint, yPoint, ref]);

    return { x, y };
}
