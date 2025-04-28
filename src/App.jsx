import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(15);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#1b2344] p-10 rounded-2xl w-[600px] shadow-lg">
        <h1 className="text-4xl text-white font-bold text-center mb-8">
          Password generator
        </h1>
  
        <div className="flex mb-6">
          <input
            type="text"
            value={password}
            className="flex-1 py-3 px-4 rounded-l-2xl text-orange-500 bg-white outline-none text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-[#2962FF] hover:bg-blue-700 text-white px-6 rounded-r-2xl text-lg font-semibold"
          >
            copy
          </button>
        </div>
  
        <div className="flex items-center gap-x-6 text-orange-500 text-sm flex-wrap">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-blue-500"
            />
            <span>Length: {length}</span>
          </div>
  
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
  
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
  }
  export default App;
  