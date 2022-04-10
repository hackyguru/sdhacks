import { useEffect, useRef, useState } from "react";
import { init, insert, startListener, all } from "../utils/instances";
import { NavLink } from "react-router-dom";

export default function Chat(props) {
  const [dbClientInitialized, setDbClientInitialized] = useState(false);

  const name = props.name;
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      if (!dbClientInitialized) {
        await init();
        await setMessages(await all("Messages"));
        await setDbClientInitialized(true);
        // startListener([{ actionTypes: ["CREATE"] }], listen);
      }
    })();
  }, [dbClientInitialized]);

  // async function listen(reply) {
  //   if (messages.length) {
  //     await setMessages(
  //       messages.concat([
  //         { name: reply.instance.name, message: reply.instance.message },
  //       ])
  //     );
  //   } else {
  //     let m = await all("Messages");
  //     await setMessages(
  //       m.concat([
  //         { name: reply.instance.name, message: reply.instance.message },
  //       ])
  //     );
  //   }
  // }

  async function sendMessage() {
    if (!messageRef.current.value) {
      alert("Please Enter a Message to Send");
      return;
    }

    await insert("Messages", { name, message: messageRef.current.value });

    setMessages(messages.concat([{ name, message: messageRef.current.value }]));

    messageRef.current.value = "";
  }

  return (
      <div className="flex flex-col w-screen">
        <div
          id="chat"
          className="flex flex-col mt-2 flex-col-reverse h-screen overflow-y-scroll	 space-y-3 pb-3 "
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.name == name
                  ? "w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5"
                  : "other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2"
              }
            >
              {message.message}
              <br />
              By: {message.name}
            </div>
          ))}
        </div>
        <div className="flex flex-row  items-center  bottom-0 my-2 w-full">
          <div className="ml-2 flex flex-row border-gray items-center w-full border rounded-3xl h-12 px-2">
            <button className="focus:outline-none flex items-center justify-center h-10 w-10 hover:text-red-600 text-red-400 ml-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
            <div className="w-full">
              <input
                ref={messageRef}
                type="text"
                id="message"
                className="border rounded-2xl border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                placeholder="Type your message...."
              />
            </div>
            <div className="flex flex-row">
              <button className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-blue-600  text-blue-400">
                <svg
                  className="w-5 h-5 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
              <button
                id="capture"
                className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-green-600 text-green-400 ml-1 mr-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={"ml-3"}>
            <button
              onClick={() => sendMessage()}
              id="self"
              className="flex items-center justify-center h-10 w-10 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white focus:outline-none"
            >
              <svg
                className="w-5 h-5 transform rotate-90 -mr-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
  );
}
