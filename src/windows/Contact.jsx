import windowWrapper from "#hoc/WindowWrapper.jsx";
import {socials} from "#constants/index.js";
import {WindowControls} from "#components/index.js";


const Contact = () => {
    return <>
    <div id="window-header">
        <WindowControls target="contact"/>
        <h2>Contact Me</h2>
    </div>
    <div className="p-5 space-y-5">
        <img src="images/vivek-01.jpeg" alt="Vivek"
        className="w-30 h-30 object-cover overflow-hidden rounded-full"/>
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p>example@gmail.com</p>

        <ul>
            {socials.map(({ id, bg, link, icon, text }) => (
                <li key={id} style={{ backgroundColor: bg }}>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded"
                    >
                        <img src={icon} alt={text} className="size-5" />
                        <p>{text}</p>
                    </a>
                </li>
            ))}
        </ul>
    </div>
    </>
}

const ContactWindow = windowWrapper(Contact, 'contact')
export default ContactWindow
