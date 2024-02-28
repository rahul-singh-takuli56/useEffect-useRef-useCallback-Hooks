import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hooks for copying the text
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}|?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copypassWordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div>
        <div className="w-full max-w-lg mx-auto shadow-md bg-gray-800 m-4 p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-center text-white my-3">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
            <input
              type="text"
              value={password}
              placeholder="Password"
              className="outline-none w-full py-1 px-3 rounded-sm"
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={copypassWordToClipBoard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-sm hover:bg-lime-500"
            >
              Copy
            </button>
          </div>

          <div className="flex text-sm gap-x-2 text-orange-700">
            <div className="flex items-center gap-x-1 ">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                className="cursor-pointer"
              />
              <label>Length:{length}</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Number</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
