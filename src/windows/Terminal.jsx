import React from 'react'
import windowWrapper from "#hoc/WindowWrapper.jsx";
import {techStack} from "#constants/index.js";
import {Check, Flag} from "lucide-react";
import WindowControls from "#components/WindowControls.jsx";

const Terminal = () => {
    return <>
        <div id="window-header">
            <WindowControls target="terminal"/>
            <h2 className='text-lg '>Tech Stack</h2>
        </div>

        <div className="techstack">
            <p>
                <span className="font-bold">@Vivek % </span>
                show tech stack
            </p>
            <div className="label">
                <p className="w-32 font-bold text-gray-900">Category</p>
                <p className='text-gray-900 font-bold'>Technologies</p>
            </div>

            <ul className="content ">
                {techStack.map(({category, items}) => (
                    <li key={category} className="flex gap-5 items-center">
                        <Check className="check" size={20}/>
                        <h1>{category}</h1>
                        <ul className='ml-5 text-left'>
                            {items.map((item, index) => (
                                <li key={index} className=''>
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
