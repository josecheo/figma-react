"use client";
import { useState } from "react";
import generateBaseCodeJSX from "../utils/generateJSXFromJSON";
import generateCssFromJSON from "../utils/generateCssFromJSON";
import { CopyBlock, atomOneDark, dracula } from "react-code-blocks";
import { fetchFigma } from "../utils/fetchFigma";
import DefaultAccordion from "../components/Accordion";
import { Spinner } from "@material-tailwind/react";

export default function Home() {
  const [fileID, setSileID] = useState("");
  const [document, setDocument] = useState(null);
  const [code, setCode] = useState("");
  const [codeCss, setCodeCss] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResult = async () => {
    setIsLoading(true);
    setDocument(null);
    setCodeCss("");
    setCode("");
    const response = await fetchFigma(fileID);
    if (response) {
      const { document: documentApi } = response;
      setDocument(documentApi);
      setIsLoading(false);
    }
  };

  const getCodeByFrame = async (frame) => {
    const resutlJsx = generateBaseCodeJSX(frame);
    const resutlCss = generateCssFromJSON(frame);

    setCode(resutlJsx);
    setCodeCss(resutlCss);
  };

  return (
    <main className="flex min-h-screen p-24 gap-12">
      <div className="flex flex-col ">
        <h1 className="text-2xl	font-bold	">FIGMA TO REACT</h1>
        <div className="flex-col space-y-9">
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Escribe el id de documento
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  https://api.figma.com/v1/files/
                </span>
                <input
                  type="text"
                  onChange={(e) => setSileID(e.target.value)}
                  name="file"
                  id="file"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="15LXvx6W99OE5stHw1vRwc"
                />
              </div>
              <button
                type="submit"
                onClick={() => handleResult()}
                disabled={isLoading}
                className="mt-3 rounded-md bg-blue-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 w-[100%]"
              >
                {isLoading ? "Cargando..." : "Cargar data"}
              </button>
            </div>
          </div>

          {/* pantallas */}
          {isLoading ? (
            <Spinner className="h-16 w-16 " color="blue" />
          ) : (
            <div className="flex-col space-y-4">
              {document &&
                document.children.map((page) => {
                  return (
                    page.name === "Pantallas" && (
                      <DefaultAccordion
                        title={page.name}
                        content={page.children}
                        getCodeByFrame={getCodeByFrame}
                      />
                    )
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* codigo */}
      {code && codeCss && (
        <div className="flex gap-4">
          <div className="flex flex-col w-[500px] min-h-[300px] max-h-[600px] overflow-auto">
            <p className="text-base">Codigo JSX</p>
            <CopyBlock
              language="jsx"
              text={code}
              wrapLines={true}
              showLineNumbers={false}
              theme={atomOneDark}
              codeBlock
            />
          </div>
          <div className="flex flex-col w-[500px] min-h-[300px] max-h-[600px] overflow-auto">
            <p>Codigo Css</p>
            <CopyBlock
              language="css"
              text={codeCss}
              wrapLines={true}
              showLineNumbers={false}
              theme={dracula}
              codeBlock
            />
          </div>
        </div>
      )}
    </main>
  );
}
