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
  function fetchvpro() {
    setLoading(true);
    console.log("Hello");
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
      // console.log(
      //   "stdout: " +
      //     xmlDoc.getElementsByTagName("Solution")[0].getAttribute("name")
      // );
    });
  }

  return (
    <>
      <Head>
        <title>GCA Intel vPro Detector</title>
      </Head>
      <div>
        <h1 className="p-8 text-4xl text-center">GCA Intel vPro Detector</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <img className="h-40" src="/images/Intel.svg" />
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
            <ul>
              <li>State: {status}</li>
              <li>Exist: {exist}</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
