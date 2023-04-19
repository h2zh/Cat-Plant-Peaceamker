import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { useState } from "react";
import "./App.css";

function App() {
  const [buzzer, setBuzzer] = useState(true);
  const [email, setEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleEnd = () => {
    SpeechRecognition.stopListening();
    handleSubmit();
  };

  const handleSubmit = () => {
    setLoading(true);
    const q = encodeURIComponent(transcript);
    const uri = "https://api.wit.ai/message?v=20230419&q=" + q;
    const auth = "Bearer 6QVLPGAHBAV2AL55FZ4PDIXI2BYDLADR"; // + process.env.CLIENT_TOKEN;
    fetch(uri, { headers: { Authorization: auth } })
      .then((res) => res.json())
      .then((res) => {
        if (res["intents"][0]["name"] === "get_stats") {
          speak({ text: "Ouch! The cat harassed me 9 times today!" });
        } else {
          setBuzzer(JSON.parse(res["traits"]["buzzer_sound"][0]["value"]));
          setEmail(JSON.parse(res["traits"]["email_notification"][0]["value"]));
        }
        setLoading(false);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-sans lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center text-xl text-white font-bold  bg-indigo-700 pb-6 pt-8 lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit ">
          Cat/Plant Peaceamker
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center text-sm bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p>Presented by Group 4 - CS 839 Building User Interface</p>
        </div>
      </div>

      <div className="relative grid place-items-center grid-cols-2 space-x-10">
        {buzzer ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="currentColor"
            class="w-48 h-48"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="currentColor"
            class="w-48 h-48"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
        {email ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="currentColor"
            class="w-48 h-48"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="currentColor"
            class="w-48 h-48"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        )}
      </div>
      {loading ? (
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}

      {transcript ? (
        <p className="fixed left-0 top-0 flex w-full justify-center text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit ">
          {transcript}
        </p>
      ) : null}

      <div className="mb-32 grid text-center place-items-center justify-between lg:mb-0 grid-cols-1 lg:text-left">
        {listening ? (
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleEnd}
          >
            Stop
          </button>
        ) : (
          <>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-full"
              onClick={handleStart}
            >
              Start speaking
            </button>
            <p className="mt-5">
              Examples: "Good night! Don't bother me at night."
            </p>
            <p>"How is my cat behaving today?"</p>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
