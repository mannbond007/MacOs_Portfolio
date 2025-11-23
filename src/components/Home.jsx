import { locations } from "#constants";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

gsap.registerPlugin(Draggable);

const projects = locations.work?.children ?? [];

const Home = () => {
    const {openWindow} = useWindowStore();
    const {setActiveLocation} = useLocationStore();
    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow('finder');
    }
    useGSAP(() => {
        Draggable.create(".folder", {
            bounds: "body",
            inertia: false,
            cursor: "grab",
            activeCursor: "grabbing",
        });
    }, []);

    return (
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder absolute", project.position)}
                        onClick={() => handleOpenProjectFinder(project)}
                    >
                        <img src="/images/folder.png" alt={project.name} />
                        <p className="text-sm mt-1">{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
