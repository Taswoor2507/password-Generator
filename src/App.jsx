import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [length, setLength] = useState(8);

  const clipBoardReference = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwxys";

    if (numbersAllowed) str += "1234567890";
    if (charactersAllowed) str += "$!_-+$%*";

    for (let i = 1; i <= length; i++) {
      let randomChars = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomChars);
    }

    setPassword(pass);
  }, [numbersAllowed, charactersAllowed, setPassword, length]);

  useEffect(() => {
    generatePassword();
  }, [charactersAllowed, numbersAllowed, length, generatePassword]);

  const copyPasswordToClipboard = useCallback(() => {
    clipBoardReference.current?.select();
    // clipBoardReference.current?.setSelectionRange(0);
    // console.log(clipBoardReference.current?.select);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className=" text-white ">
        <div className="w-full max-w-md bg-slate-700 mx-auto py-4 px-2 mt-10 shadow-lg rounded-md min-h-[300px] shadow-slate-950">
          <h1 className="text-xl font-semibold text-center mb-3 ">
            PASSWORD GENERATOR
          </h1>
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full">
              <input
                type="text"
                readOnly
                value={password}
                ref={clipBoardReference}
                className="flex-1 px-1 py-2 text-black font-semibold border-none outline-none"
              />
              <button
                onClick={copyPasswordToClipboard}
                className="border-none py-2 px-3 outline-none bg-orange-700"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center flex-wrap">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>

              <input
                type="checkbox"
                id="numberAllowed"
                onChange={() => {
                  setNumbersAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberAllowed" className="px-1 font-bold text-sm">
                Numbers
              </label>
              <div className="w-3"></div>
              <input
                type="checkbox"
                id="charAllowed"
                className=""
                onChange={() => {
                  setCharactersAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charAllowed" className="px-1 font-bold text-sm">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
