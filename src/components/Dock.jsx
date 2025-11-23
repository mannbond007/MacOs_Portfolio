import React, { useRef } from 'react'
import { dockApps } from "#constants/index.js";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/window.js";

const Dock = () => {

    const {openWindow, closeWindow, windows} = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        // Select icons ONLY inside this dock
        const icons = dock.querySelectorAll(".dock-icon");

        const handleMouseMove = (e) => {
            const rect = dock.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;

            icons.forEach((icon) => {
                const iconRect = icon.getBoundingClientRect();
                const centerX = iconRect.left - rect.left + iconRect.width / 2;

                // Distance between mouse and icon
                const distance = Math.abs(mouseX - centerX);

                // macOS natural magnification curve
                const scale = 1 + Math.max(0, 1 - distance / 120) * 0.8;

                gsap.to(icon, {
                    scale,
                    transformOrigin: "bottom center",  // no gaps!
                    duration: 0.2,
                    ease: "power3.out"
                });
            });
        };

        const resetScale = () => {
            icons.forEach((icon) => {
                gsap.to(icon, {
                    scale: 1,
                    transformOrigin: "bottom center",
                    duration: 0.3,
                    ease: "power3.out"
                });
            });
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetScale);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetScale);
        };

    }, []);

    const toggleApp = (app) => {
        if (!app.canOpen) return;

        const window = windows[app.id];
        if(window.isOpen){
            closeWindow(app.id);
        }else {
            openWindow(app.id)
        }
        // console.log(windows)

    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container px-2 py-2">

                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relativev  flex justify-center ">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                            style={{
                                willChange: "transform",
                                transformOrigin: "bottom center"
                            }}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? "" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}
            </div>

            <Tooltip id="dock-tooltip" place="top" className="tooltip" />
        </section>
    );
};

export default Dock;
