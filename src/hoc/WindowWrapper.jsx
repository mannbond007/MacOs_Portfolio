import React, { useLayoutEffect, useRef } from 'react';
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        // OPEN ANIMATION
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
        }, [isOpen]);

        // DRAGGABLE SETUP
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
                cursor: "grab",
                activeCursor: "grabbing"
            });

        }, []);

        // SHOW / HIDE WINDOW
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;

            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className="absolute top-10 left-1/2 -translate-x-1/2"
            >
                <Component {...props} />
            </section>
        );
    };

    wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return wrapped;
};

export default WindowWrapper;
