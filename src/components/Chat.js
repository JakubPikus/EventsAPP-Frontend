import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import ips_config from "../ips_config";
import { UserCircleIcon, XIcon, CheckCircleIcon } from "@heroicons/react/solid";
import {
  CheckCircleIcon as CheckCircleIconSend,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  user_conversation,
  send_message,
  chat_close,
} from "../actions/websockets";
import { getUser, getXCSRFToken, getContactWebsockets } from "../selectors";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function Chat({ position, data, textMessage, setTextMessage }) {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);
  const user = useSelector(getUser);
  const contactData = useSelector(getContactWebsockets);
  const [contentHeight, setContentHeight] = useState(288);
  const [textareaHeight, setTextareaHeight] = useState(40);
  const textareaRef = useRef(null);

  // GDY OKNO NIE BYLO OTWORZONE, POBIERZ ARCHIWALNE WIADOMOSCI
  useEffect(() => {
    if (data.was_opened == false) {
      dispatch(
        user_conversation(
          data.id,
          data.messages?.data[0].message_id != undefined
            ? data.messages.data[0].message_id
            : "",
          xcsrftoken
        )
      );
    }
  }, [data]);

  // GDY ID ROZMOWCY SIE ZMIENI, PODSTAW INPUT DO OKNA WIADOMOSCI TAK, ABY ZACHOWAC STARY NIEWYSLANY TEKST DLA KONKRETNEGO OKNA

  useEffect(() => {
    const textarea_element = textareaRef.current;
    if (textarea_element) {
      textarea_element.value = textMessage == undefined ? "" : textMessage;
      changeChatHeight(textarea_element);
    }
  }, [data.id]);

  function handleChangeTextarea(event) {
    changeChatHeight(event.target);
    setTextMessage((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }

  function changeChatHeight(element) {
    element.style.height = `40px`;
    const newHeight = element.scrollHeight + 4;
    element.style.height = `${newHeight}px`;

    if (textareaHeight !== newHeight) {
      const heightDifference = newHeight - textareaHeight;
      setTextareaHeight(newHeight);
      setContentHeight((prevHeight) => prevHeight - heightDifference);
    }
  }

  function infiniteLoadMessages() {
    dispatch(user_conversation(data.id, data.messages.cursor_id, xcsrftoken));
  }

  function authorMessage(data, index) {
    return (
      <div
        className="flex w-full flex-col items-end justify-end px-1"
        key={index}
      >
        <div className="flex h-auto w-full flex-row items-end justify-end space-x-1">
          <div className="break-anywhere h-min-12 flex h-auto w-auto max-w-40 items-center justify-center rounded-xl bg-blue-400 p-2">
            <span className={`text-md h-auto font-mukta text-gray-200`}>
              {data.content}
            </span>
          </div>
          {iconMessageStatus(data.status)}
        </div>
        {data.error_details !== undefined && (
          <span className={`h-auto pr-5 font-mukta text-xs text-red-400`}>
            {data.error_details}
          </span>
        )}
      </div>
    );
  }

  function recipientMessage(data, image_thumbnail, index) {
    return (
      <div
        className="flex h-auto w-full items-end justify-between px-1"
        key={index}
      >
        <div className="flex w-full flex-row items-end space-x-2 ">
          <img
            src={`${ips_config.BACKEND}${image_thumbnail}`}
            className={`h-8 w-8 rounded-full object-cover`}
          ></img>
          <div className="break-anywhere h-min-12 flex h-auto max-w-40  items-center justify-center rounded-xl bg-neutral-700 p-2">
            <span className={`text-md h-auto font-mukta text-gray-200`}>
              {data.content}
            </span>
          </div>
        </div>
        {iconMessageStatus(data.status)}
      </div>
    );
  }

  function moduleMessage(data, recipient_image_thumbnail) {
    return (
      <div
        id="messagesDivObjects"
        className="flex flex-col-reverse overflow-auto"
      >
        <InfiniteScroll
          dataLength={data?.data.length == undefined ? 0 : data.data.length}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
          inverse={true}
          loader={
            <div className="flex w-full items-center justify-center pb-4">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="36"
                visible={true}
              />
            </div>
          }
          next={() => infiniteLoadMessages()}
          hasMore={
            data?.end_pagination == undefined ? false : !data.end_pagination
          }
          scrollableTarget={"messagesDivObjects"}
        >
          <div className="flex flex-col-reverse gap-3">
            {data?.data.map((message, index) =>
              user.id == message.author
                ? authorMessage(message, index)
                : recipientMessage(message, recipient_image_thumbnail, index)
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  function iconMessageStatus(status) {
    if (status == "is_sending") {
      return (
        <PaperAirplaneIcon
          className={`h-4 w-4 rotate-90 text-blue-400 `}
        ></PaperAirplaneIcon>
      );
    } else if (status == "is_send") {
      return (
        <CheckCircleIconSend
          className={`h-4 w-4  text-blue-400 `}
        ></CheckCircleIconSend>
      );
    } else if (status == "is_delivered") {
      return (
        <CheckCircleIcon
          className={`h-4 w-4  text-blue-400 `}
        ></CheckCircleIcon>
      );
    } else if (status == "not_send") {
      return <XIcon className={`h-4 w-4  text-red-400 `}></XIcon>;
    }
  }

  function moduleBlockedUser(data) {
    if (data.block_target_user) {
      return (
        <div className="flex h-12 w-full items-center justify-center rounded-b-2xl bg-slate-800 p-1">
          <span
            className={`flex h-auto w-full items-center justify-center text-center font-mukta text-sm text-red-400`}
          >
            Zablokowałeś tego użytkownika
          </span>
        </div>
      );
    } else if (data.blocked_by_target_user) {
      return (
        <div className="flex h-12 w-full items-center justify-center rounded-b-2xl bg-slate-800 p-1">
          <span
            className={`flex h-auto w-full items-center justify-center text-center font-mukta text-sm text-red-400`}
          >
            Zostałeś zablokowany przez tego użytkownika
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex h-auto w-full items-end justify-between rounded-b-2xl bg-slate-800 p-1">
          <textarea
            ref={textareaRef}
            className="max-h-68 h-10 w-56 resize-none rounded-xl border-2 border-gray-500 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0"
            placeholder={"Wyślij wiadomość"}
            onChange={handleChangeTextarea}
            maxLength="500"
            id={data.id}
          ></textarea>
          <button
            disabled={
              textMessage?.length == undefined || textMessage.length < 1
            }
            className="h-10 w-8 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
            onClick={() => {
              dispatch(send_message(data.id, textMessage, uuidv4(), user.id));
              const textarea_element = textareaRef.current;
              textarea_element.value = "";
              setTextMessage((prevState) => ({
                ...prevState,
                [data.id]: "",
              }));
              changeChatHeight(textarea_element);
            }}
          >
            <span
              className={`flex h-auto w-full items-center justify-center text-center font-mukta text-sm text-gray-200`}
            >
              Wyślij
            </span>
          </button>
        </div>
      );
    }
  }

  return (
    <div
      className={`

            ${position == 2 && "mr-[46rem]"} 

            ${position == 1 && "mr-[22rem]"} 

            ${position == 0 && "mr-[-2rem]"}

            fixed right-16 bottom-5 z-30 flex h-96 w-80 flex-col rounded-2xl bg-gray-600 shadow-xl`}
    >
      <div className="flex h-12 w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
        <div className="flex h-full w-auto flex-row items-center space-x-3">
          <Link
            to={`/user/${data.username}`}
            className="flex h-8 w-8 cursor-pointer items-center justify-between"
          >
            <img
              src={`${ips_config.BACKEND}${data.image_thumbnail}`}
              className={`h-8 w-8 rounded-full object-cover`}
            ></img>
          </Link>

          <Link
            to={`/user/${data.username}`}
            className="flex h-auto w-auto cursor-pointer items-center"
          >
            <span className={`text-md h-auto font-mukta text-gray-200`}>
              {data.username}
            </span>
          </Link>

          {data.is_friend && (
            <UserCircleIcon
              className={`-mt-1 h-5 w-5 text-gray-600 `}
            ></UserCircleIcon>
          )}

          {contactData.online_friends.includes(parseInt(data.id)) && (
            <div className="-mt-1 flex h-4 w-4 rounded-full bg-green-400"></div>
          )}
        </div>
        <XIcon
          className="h-6 w-6 cursor-pointer text-red-400"
          onClick={() => {
            setTextMessage((prevState) => {
              const newState = { ...prevState };
              delete newState[data.id];
              return newState;
            });
            dispatch(chat_close(data.id));
          }}
        />
      </div>

      <div
        className="flex w-full flex-col"
        style={{ height: `${contentHeight}px` }}
      >
        {moduleMessage(data.messages, data.image_thumbnail)}
      </div>

      {moduleBlockedUser(data)}
    </div>
  );
}

export default Chat;
