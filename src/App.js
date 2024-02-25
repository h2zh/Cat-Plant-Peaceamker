import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [resText, setResText] = useState("");
  const baseUrl =
    "https://ursearch-api.salmonmeadow-33eeb5e6.westus2.azurecontainerapps.io/";

  const testGetJobSeeker = () => {
    const url = baseUrl + "api/jobseeker/20";
    setResText("");
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResText(
          "Successfully fetched jobseeker, open the console to see the response object."
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // add other tests here
  // when testing an endpoint that requires authentication, you can use the cookies from the Postman cookie manager after signup/login

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-sans lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center text-xl text-white font-bold  bg-indigo-700 pb-6 pt-8 lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit ">
          Backend-Frontend Integration Test Site
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center text-sm bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p>ursearch</p>
        </div>
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-full"
        onClick={testGetJobSeeker}
      >
        TestGetJobSeeker
      </button>

      {/* add more buttons here for other tests */}

      {resText ? (
        <p className="fixed left-0 top-0 flex w-full justify-center text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit ">
          {resText}
        </p>
      ) : null}
    </main>
  );
}

export default App;
