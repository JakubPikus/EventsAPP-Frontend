import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "../actions/auth";
import Notification from "./Notification";
import {
  getIsAuthenticated,
  getUser,
  getChatSettings,
  getXCSRFToken,
  getContactWebsockets,
} from "../selectors";
import { DotsHorizontalIcon, XIcon, MinusIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  websockets_connect,
  friends_list,
  messages_list,
  online_friends,
  chat_open,
  chat_close,
} from "../actions/websockets";
import ips_config from "../ips_config";
import Chat from "./Chat";

function SessionAuth({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userData = useSelector(getUser);
  const chatSettings = useSelector(getChatSettings);
  const [textMessage, setTextMessage] = useState({});
  const xcsrftoken = useSelector(getXCSRFToken);
  const websocket = useSelector(getContactWebsockets);

  const [maxChatOpen, setMaxChatOpen] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1670) {
        setMaxChatOpen(3);
      } else if (window.innerWidth >= 1290) {
        setMaxChatOpen(2);
      } else {
        setMaxChatOpen(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(user());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated !== "checking") {
      setIsLoading(false);
    }
    if (isAuthenticated == true) {
      dispatch(websockets_connect(userData.id, xcsrftoken));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (websocket.socket !== null) {
      const interval = setInterval(() => {
        dispatch(online_friends());
      }, 120000);
      return () => clearInterval(interval);
    }
  }, [websocket.socket]);

  const [isLoading, setIsLoading] = useState(true);

  const [statusMoreChats, setStatusMoreChats] = useState(false);

  useEffect(() => {
    if (chatSettings.length < maxChatOpen + 1 && statusMoreChats) {
      setStatusMoreChats(false);
    }
  }, [chatSettings.length]);

  function showMoreChats(status) {
    return status ? (
      <div
        className={`group fixed right-16 bottom-5 z-40 flex w-48 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-600 shadow-xl
        ${chatSettings.length == maxChatOpen + 1 && `h-[57px]`} 
        ${chatSettings.length == maxChatOpen + 2 && `h-[99px]`} 
        ${chatSettings.length == maxChatOpen + 3 && `h-[140px]`} 
        ${chatSettings.length > maxChatOpen + 3 && `h-[181px]`}

        ${maxChatOpen == 3 && "mr-[68rem]"} 
        ${maxChatOpen == 2 && "mr-[44rem]"}
        ${
          maxChatOpen == 1 &&
          "mb-[25rem] mr-[-2rem]  md:mb-[0rem] md:mr-[20rem]"
        }
        `}
      >
        <div className="flex h-6 w-full items-center justify-between rounded-t-2xl bg-slate-700 pl-3 pr-2">
          <span className={`h-auto font-mukta text-[11px] text-gray-200`}>
            Pozostałe konwersacje
          </span>

          <XIcon
            className={`h-4 w-4  cursor-pointer text-red-400`}
            onClick={() => setStatusMoreChats(false)}
          ></XIcon>
        </div>

        <Scrollbars
          renderThumbVertical={({ style, props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "#000",
                width: "4px",
                opacity: "0.6",
              }}
            ></div>
          )}
        >
          <div
            className={`flex w-full flex-col divide-y-2 divide-slate-700 rounded-b-2xl ${
              chatSettings.length > maxChatOpen + 4 && "pr-3"
            }`}
          >
            {chatSettings.map((data, index) => {
              if (index >= maxChatOpen) {
                return (
                  <div
                    className={`flex h-10 w-full items-center justify-between divide-x-2 divide-slate-700 border-slate-700 ${
                      chatSettings.length > maxChatOpen + 4 && "border-r-2"
                    }`}
                    key={index}
                  >
                    <div
                      className="flex h-full flex-grow cursor-pointer flex-row items-center space-x-2 bg-gray-600 pl-1 transition duration-150 ease-in-out hover:bg-gray-500"
                      onClick={() => dispatch(chat_open(data))}
                    >
                      <img
                        src={`${ips_config.BACKEND}${data.image_thumbnail}`}
                        className={`h-6 w-6 rounded-full`}
                      ></img>

                      <span
                        className={`h-auto truncate font-mukta text-sm text-gray-200`}
                      >
                        {data.username}
                      </span>
                    </div>
                    <div className="group flex h-full w-6 cursor-pointer items-center justify-center bg-gray-600 transition duration-150 ease-in-out hover:bg-gray-500">
                      <MinusIcon
                        className={`h-4 w-4  text-red-400 transition ease-in-out group-hover:scale-110`}
                        onClick={() => {
                          setTextMessage((prevState) => {
                            const newState = { ...prevState };
                            delete newState[data.id];
                            return newState;
                          });
                          dispatch(chat_close(data.id));
                        }}
                      ></MinusIcon>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Scrollbars>
      </div>
    ) : (
      <div
        className={`group fixed right-16 bottom-5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-600 shadow-xl 
        ${maxChatOpen == 3 && "mr-[68rem]"} 
        ${maxChatOpen == 2 && "mr-[44rem]"}
        ${
          maxChatOpen == 1 &&
          "mb-[25rem] mr-[-2rem]  md:mb-[0rem] md:mr-[20rem]"
        }
        
        
        `}
        onClick={() => setStatusMoreChats(true)}
      >
        <DotsHorizontalIcon
          className={`h-8 w-8 text-slate-800  transition ease-in-out group-hover:scale-110`}
        ></DotsHorizontalIcon>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <>
          {children}
          <Notification />
          {chatSettings.length > maxChatOpen && showMoreChats(statusMoreChats)}
          {chatSettings[0] !== undefined && maxChatOpen >= 1 && (
            <Chat
              position={0}
              data={chatSettings[0]}
              textMessage={textMessage[chatSettings[0].id]}
              setTextMessage={setTextMessage}
            />
          )}
          {chatSettings[1] !== undefined && maxChatOpen >= 2 && (
            <Chat
              position={1}
              data={chatSettings[1]}
              textMessage={textMessage[chatSettings[1].id]}
              setTextMessage={setTextMessage}
            />
          )}
          {chatSettings[2] !== undefined && maxChatOpen >= 3 && (
            <Chat
              position={2}
              data={chatSettings[2]}
              textMessage={textMessage[chatSettings[2].id]}
              setTextMessage={setTextMessage}
            />
          )}
        </>
      )}
    </>
  );
}
export default SessionAuth;
