import React from "react";
import Head from "next/head";
import Link from "next/link";
var sudo = require("sudo-prompt");

const Home = () => {
  function fetchvpro() {
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
      console.log("stdout: " + stdout);
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
          <button
            className="px-6 py-4 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
            onClick={fetchvpro}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
