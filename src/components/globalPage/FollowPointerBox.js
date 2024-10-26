import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useFollowPointer } from "./useFollowPointer.ts";
import "./boxStyle.css";

const FollowPointerBox = () => {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);

    return (
        <motion.div
            ref={ref}
            className="box"
            style={{ x, y }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
};

export default FollowPointerBox;
