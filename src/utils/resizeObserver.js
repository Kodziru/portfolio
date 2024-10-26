// src/utils/resizeObserver.js

export const observeResize = (element, callback) => {
    const resizeObserver = new ResizeObserver((entries) => {
        setTimeout(() => {
            // Ajoute un délai pour éviter la boucle infinie
            for (let entry of entries) {
                callback(entry);
            }
        }, 0);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
};
