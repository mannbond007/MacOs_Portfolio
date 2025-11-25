import windowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Download } from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  return (
    <>
      <div
        id="window-header"
        className="flex items-center justify-between p-2  border-b"
      >
        <WindowControls target="resume" />

        <h2 className="font-semibold">Resume.pdf</h2>

        <a
          href="/files/resume.pdf"
          download
          title="Download Resume"
          className="cursor-pointer px-2 py-1 text-xs bg-blue-600 text-white rounded-md 
             hover:bg-blue-700 transition flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </a>
      </div>

      <Document file="/files/resume.pdf">
        <Page
          pageNumber={1}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>
    </>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");
export default ResumeWindow;
