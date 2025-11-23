import React from "react";
import { WindowControls } from "#components/index.js";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";
import { locations } from "#constants";
import clsx from "clsx";

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const openItem = (item) => {
        if (!item) return;

        // PDF → Resume
        if (item.fileType === "pdf") {
            return openWindow("resume", item);
        }

        // TXT → Text Viewer
        if (item.fileType === "txt") {
            return openWindow("txtfile", item);
        }

        // PNG/JPG → Image Viewer
        if (item.fileType === "img") {
            return openWindow("imgfile", item);   // ⭐ FIX PNG
        }

        // Folder → Navigate
        if (item.kind === "folder") {
            return setActiveLocation(item);
        }

        // URL / FIGMA link
        if (["fig", "url"].includes(item.fileType) && item.href) {
            return window.open(item.href, "_blank");
        }
    };


    return (
        <>
            <div id="window-header" className="flex items-center justify-between">
                <WindowControls target="finder" />
                <Search className="icon" />
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar p-3 w-48 border-r">
                    <div className="mb-4">
                        <h3 className="text-xs uppercase text-gray-500 mb-2">Favorites</h3>

                        <ul className="space-y-2">
                            {Object.values(locations).map((loc) => (
                                <li
                                    key={loc.id}
                                    onClick={() => setActiveLocation(loc)}
                                    className={clsx(
                                        "flex items-center gap-2 p-1 rounded cursor-pointer",
                                        loc.id === activeLocation.id
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100"
                                    )}
                                >
                                    <img src={loc.icon} alt={loc.name} className="w-4 h-4" />
                                    <span className="text-sm truncate max-w-[120px]">
                                        {loc.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs uppercase text-gray-500 mb-2">My Projects</h3>

                        <ul className="space-y-2">
                            {locations.work.children.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => setActiveLocation(item)}
                                    className={clsx(
                                        "flex items-center gap-2 p-1 rounded cursor-pointer",
                                        item.id === activeLocation.id
                                            ? "bg-blue-100 text-blue-700"
                                            : "hover:bg-gray-100"
                                    )}
                                >
                                    <img src={item.icon} alt={item.name} className="w-4 h-4" />
                                    <span className="text-sm truncate max-w-[120px]">
                                        {item.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <ul className="content relative flex-1 p-4">
                    {activeLocation?.children?.map((item) => (
                        <li
                            key={item.id}
                            className={`absolute ${item.position} cursor-pointer text-center`}
                            onClick={() => openItem(item)}
                        >
                            <img src={item.icon} alt={item.name} className="w-12" />
                            <p className="text-xs mt-1 truncate max-w-[70px]">
                                {item.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
