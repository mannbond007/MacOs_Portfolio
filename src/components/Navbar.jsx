import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants/index.js";
import useWindowStore from "#store/window.js";


const Navbar = () => {
    const { openWindow } = useWindowStore();


    return <nav>
        <div >
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold text-gray-800 text-lg">My | Portfolio</p>

            <ul>
                {navLinks.map(({ id, name, type }) => (
                    <li
                        className="relative font-bold  text-gray-800 text-lg tracking-tight cursor-pointer
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:h-[2px] after:w-0 after:bg-slate-900 after:transition-all 
             after:duration-300 hover:after:w-full"
                        onClick={() => openWindow(type)}
                        key={id}
                    >
                        {name}
                    </li>

                ))}
            </ul>
        </div>

        <div>
            <ul>
                {
                    navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={`icon-${id}`} />
                        </li>
                    ))
                }
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
}
export default Navbar
