import React from 'react'
import windowWrapper from "#hoc/WindowWrapper.jsx";
import {techStack} from "#constants/index.js";
import {Check, Flag} from "lucide-react";
import WindowControls from "#components/WindowControls.jsx";

const Terminal = () => {
    return <>
        <div id="window-header">
            <WindowControls target="terminal"/>
            <h2>Tech Stack</h2>
        </div>

        <div className="techstack">
            <p>
                <span className="font-bold">@Laila % </span>
                show tech stack
            </p>
            <div className="label">
                <p className="w-32">Category</p>
                <p >Technologies</p>
            </div>

            <ul className="content">
                {techStack.map(({category, items}) => (
                    <li key={category} className="flex items-center">
                        <Check className="check" size={20}/>
                        <h1>{category}</h1>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    {item < items.length - 1? "," : ""}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <div className="footenote">
                <p>
                    <Check size={20}/> 5 0f 5 stack loaded successfully (100%)
                </p>
                <p className="text-black">
                    <Flag size={15} fill="black"/>
                </p>
            </div>
        </div>
    </>
}

const TerminalWindow = windowWrapper(Terminal, 'terminal');
export default TerminalWindow;
