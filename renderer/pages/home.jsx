import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
var sudo = require("sudo-prompt");

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("");
  const [exist, setExist] = useState("");

  function reset() {
    setLoading(false);
    setLoaded(false);
    setStatus("false");
    setExist("");
  }

  function fetchvpro() {
    setLoading(true);
    var options = {
      name: "Electron",
      icns: "/Applications/Electron.app/Contents/Resources/Electron.icns", // (optional)
    };
    sudo.exec("PlatformDiscovery.exe", options, function (
      error,
      stdout,
      stderr
    ) {
      if (error) throw error;
      const parser = new DOMParser();
      const xmlDoc = parser
        .parseFromString(stdout, "text/xml")
        .getElementsByTagName("Solution");
      var i;
      for (i = 0; i < xmlDoc.length; i++) {
        if (xmlDoc[i].getAttribute("name") === "Intel(R) AMT") {
          setStatus(xmlDoc[i].getAttribute("state"));
          setExist(xmlDoc[i].getAttribute("exist"));
          console.log(xmlDoc[i].getAttribute("state"));
          console.log(xmlDoc[i].getAttribute("exist"));
        }
      }
      setLoading(false);
      setLoaded(true);
    });
  }

  return (
    <>
      <Head>
        <title>GCA Intel vPro Detector</title>
        <link
          rel="shortcut icon"
          href="./images/GCA.png"
          type="image/x-icon"
        ></link>
      </Head>
      <div>
        <h1 className="p-8 text-4xl text-center">GCA Intel vPro Detector</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-3">
            <div>
              <img className="h-40" src="/images/Intel.svg" />
            </div>
            <div className="flex items-center justify-center">
              <svg
                fill="none"
                stroke-width="1"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-20"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <div>
              <img className="h-40" src="/images/GCA.png" />
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-8">
          {!loading && !loaded && (
            <button
              className="px-6 py-4 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
              onClick={fetchvpro}
            >
              Get Started
            </button>
          )}
          {loading && !loaded && <p>Loading</p>}
          {loaded && (
            <div className="flex flex-col">
              <ul className="text-xl">
                <li>
                  State: <span className="font-semibold">{status}</span>
                </li>
                <li>
                  Exist: <span className="font-semibold">{exist}</span>
                </li>
              </ul>
              <button
                className="px-2 py-2 mt-4 font-semibold border border-red-600 rounded hover:bg-red-400 "
                onClick={reset}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
