import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import {Navbar, Welcome, Dock, Home} from "#components";
import { Finder, Resume, Safari, Terminal, Text, Image, Contact, Photos } from "#windows/index.js";

import useWindowStore from "#store/window.js";

const App = () => {
    const { windows } = useWindowStore();

    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            {windows.finder.isOpen && <Finder />}
            {windows.resume.isOpen && <Resume />}
            {windows.terminal.isOpen && <Terminal />}
            {windows.safari.isOpen && <Safari />}
            {windows.txtfile.isOpen && <Text />}
            {windows.imgfile.isOpen && <Image />}
            {windows.contact.isOpen && <Contact />}
            <Photos/>
            <Home/>


        </main>

    );
};

export default App;
