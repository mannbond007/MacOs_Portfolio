import dayjs from "dayjs";
import {navIcons, navLinks} from "#constants/index.js";
import useWindowStore from "#store/window.js";


const Navbar = () => {
    const {openWindow} = useWindowStore();


    return <nav>
        <div >
            <img src="/images/logo.svg" alt="logo"/>
            <p className="font-bold">User's Portfolio</p>

            <ul>
                {navLinks.map(({id, name, type}) => (
                    <li
                        onClick={() => openWindow(type)}
                    key={id}>{name}
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                {
                    navIcons.map(({id, img})=>(
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={`icon-${id}`}/>
                        </li>
                    ))
                }
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
}
export default Navbar
