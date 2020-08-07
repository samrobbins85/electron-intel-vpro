import React from "react";
import Head from "next/head";
import Router from "next/router";
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
          if (
            xmlDoc[i].getAttribute("exist") === "false" &&
            xmlDoc[i].getAttribute("state") === "not supported"
          ) {
            Router.push("./double_none");
          }
          console.log(xmlDoc[i].getAttribute("state"));
          console.log(xmlDoc[i].getAttribute("exist"));
        }
      }
      // Here it knows the two values

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
        <h1 className="p-8 text-4xl font-semibold text-center">
          GCA Intel vPro Detector
        </h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-3">
            <div>
              <img className="h-40" src="/images/Intel.svg" />
            </div>
            <div className="flex items-center justify-center">
              <svg
                fill="none"
                strokeWidth="1"
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
              Run Test
            </button>
          )}
          {loading && !loaded && <div class="lds-dual-ring"></div>}
          {loaded && (
            <div className="flex flex-col items-center">
              <table class="table-auto text-lg">
                <thead>
                  <tr>
                    <th class="px-4 py-2">Property</th>
                    <th class="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border px-4 py-2">exist</td>
                    <td class="border px-4 py-2">{exist}</td>
                  </tr>
                  <tr>
                    <td class="border px-4 py-2">state</td>
                    <td class="border px-4 py-2">{status}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="w-24 py-2 mt-12 font-semibold border border-red-600 rounded hover:bg-red-400 "
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
