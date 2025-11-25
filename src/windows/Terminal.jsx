import React from "react";
import windowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants/index.js";
import { AlertTriangle, Badge, Check, Flag, Info } from "lucide-react";
import WindowControls from "#components/WindowControls.jsx";

const Terminal = () => {
  return (
    <>
      <div id="window-header" className="">
        <WindowControls target="terminal" />
        <h2 className="text-lg ">Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@Vivek % </span>
          show tech stack
        </p>
        <div className="label">
          <p className="w-32 font-bold text-gray-900">Category</p>
          <p className="text-gray-900 font-bold ml-[38px]">Technologies</p>
        </div>

        <ul className="content space-y-3">
          {techStack.map(({ category, items }) => (
            <li
              key={category}
              className="grid grid-cols-[24px_150px_1fr] items-start gap-4"
            >
              <Check className="check mt-1" size={20} />

              {/* Category */}
              <h1 className="font-semibold">{category}</h1>

              {/* Items in one clean line */}
              <ul className="flex text-[#a80672] font-semibold  gap-2 flex-nowrap">
                {items.map((item, index) => (
                  <li key={index}>
                    {item}
                    {index < items.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footenote ">
          <p className="text-[#026643] font-semibold flex gap-2 items-center">
            <Check size={20} /> 5 0f 5 stack loaded successfully (100%)
          </p>
          <p className="mt-2">
            {/* <Flag size={15} fill="black" /> */}
            <AlertTriangle size={20}  className="text-[#d21709]" />
          </p>
          
        </div>
      </div>
    </>
  );
};

const TerminalWindow = windowWrapper(Terminal, "terminal");
export default TerminalWindow;
