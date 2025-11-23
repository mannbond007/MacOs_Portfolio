import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const ImageViewer = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <h2>{name}</h2>
            </div>

            <div className="p-5 bg-white flex items-center justify-center">
                <img
                    src={imageUrl}
                    alt={name}
                    className="max-w-full max-h-[75vh] rounded shadow-lg"
                />
            </div>
        </>
    );
};

export default WindowWrapper(ImageViewer, "imgfile");
