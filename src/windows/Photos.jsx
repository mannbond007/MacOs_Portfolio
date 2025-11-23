import { Mail, Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { gallery, photosLinks } from "#constants/index.js";
import useWindowStore from "#store/window.js";

const Photos = () => {
    const { openWindow } = useWindowStore();

    const openImage = (image) => {
        openWindow("imgfile", {
            name: image.id + ".png",
            imageUrl: image.img
        });
    };

    return (
        <>

            <div id="window-header">
                <WindowControls target="photos" />
                <h2>Photos</h2>
                <Search className="icon" />
            </div>

            <div className="bg-white h-full flex">
                <aside className="w-48 border-r p-4 space-y-3">
                    {photosLinks.map(({ id, icon, title }) => (
                        <div
                            key={id}
                            className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer"
                        >
                            <img src={icon} alt={title} className="w-4" />
                            <span className="text-sm">{title}</span>
                        </div>
                    ))}
                </aside>

                <section className="flex-1 p-6 grid grid-cols-3 gap-4 overflow-auto">
                    {gallery.map((photo) => (
                        <div
                            key={photo.id}
                            className="cursor-pointer group"
                            onClick={() => openImage(photo)}
                        >
                            <img
                                src={photo.img}
                                alt={"photo-" + photo.id}
                                className="w-full h-32 object-cover rounded-md group-hover:opacity-80"
                            />
                        </div>
                    ))}
                </section>
            </div>

        </>
    );
};


const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
