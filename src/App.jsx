import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";

    if (numAllow) str += "1234567890";
    if (charAllow) str += "!@#$%^&*()-_=+;:,.<>/?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, passwordGenerator, numAllow, charAllow]);

  const passwordRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    // copy to clipboard...
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <h6 className="text-orange-500">Password Generator</h6>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 my-3 text-orange-500 ">
        <div className="flex rounded-lg mb-4 overflow-hidden bg-blue">
          <input
            className="w-full px-3 py-1"
            placeholder="password"
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className="outline-none hover:bg-white"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="charAllowed"
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label htmlFor="charAllowed">characters</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="numAllowed"
              onChange={() => setNumAllow((prev) => !prev)}
            />
            <label htmlFor="numAllowed">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
