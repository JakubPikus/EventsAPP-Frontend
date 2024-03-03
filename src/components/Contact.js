import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowCircleRightIcon,
  UserCircleIcon,
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { CheckCircleIcon as CheckCircleIconSend } from "@heroicons/react/outline";
import {
  change_state_contact,
  messages_list_next,
  friends_list_next,
  invitations_list_next,
} from "../actions/websockets";
import {
  getUser,
  getContactWebsockets,
  getXCSRFToken,
  getContactStatus,
} from "../selectors";
import {
  chat_open,
  change_state_invitations,
  notifications_list_next,
} from "../actions/websockets";
import ips_config from "../ips_config";
import { Scrollbars } from "react-custom-scrollbars-2";
import InfiniteScroll from "react-infinite-scroll-component";
import { friend_request_reaction } from "../actions/data";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function Contact({ menuStatus, contactStatus }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const user = useSelector(getUser);
  const contactData = useSelector(getContactWebsockets);
  const xcsrftoken = useSelector(getXCSRFToken);
  const wrapper = useSelector(getContactStatus);

  const scrollbarsWebsocketsRef = useRef(null);

  const title = {
    messages: "Wiadomości",
    friends: "Znajomi",
    notifications: "Powiadomienia",
  };

  useEffect(() => {
    if (scrollbarsWebsocketsRef.current) {
      scrollbarsWebsocketsRef.current.scrollTop(0);
    }
  }, [contactStatus.content]);

  function infiniteLoadEvents() {
    let dispatch_action = {
      messages: messages_list_next(
        contactData[contactStatus.content].meta.excluded_ids,
        xcsrftoken
      ),
      friends: friends_list_next(
        contactData[contactStatus.content].meta.excluded_ids,
        xcsrftoken
      ),
      notifications: notifications_list_next(
        contactData.notifications.meta.cursor_date,
        xcsrftoken
      ),
    };

    dispatch(dispatch_action[contactStatus.content]);
  }

  function infiniteLoadInvitations() {
    dispatch(
      invitations_list_next(
        contactData.friends.meta.invitations.meta.excluded_ids,
        xcsrftoken
      )
    );
  }

  function renderUser(data) {
    return (
      <div
        className={`${
          contactData.messages.meta.new_messages.users[data.id] !== undefined
            ? "bg-red-400 hover:bg-red-300"
            : "bg-gray-800 hover:bg-gray-700"
        } 
        flex h-16 w-full cursor-pointer flex-row rounded-xl transition duration-150 ease-in-out`}
        key={data.id}
        onClick={() => dispatch(chat_open(data))}
      >
        <div className="flex h-full w-1/5 items-center justify-center">
          <img
            src={`${ips_config.BACKEND}${data.image_thumbnail}`}
            className={`h-8 w-8 rounded-full object-cover`}
          ></img>
        </div>

        {contactStatus.content == "messages" ? (
          <div className="group flex h-full w-4/5 flex-col pl-2">
            <div className="flex h-1/2 w-full flex-row items-center space-x-1">
              <span className={`text-md h-auto font-mukta text-gray-200`}>
                {data.username}
              </span>
              {data.is_friend == true && (
                <UserCircleIcon
                  className={`-mt-1 h-5 w-5 text-blue-400 transition duration-150 ease-in-out group-hover:text-gray-400`}
                ></UserCircleIcon>
              )}
              {contactData.online_friends.includes(data.id) && (
                <div className="-mt-1 flex h-4 w-4 rounded-full bg-green-400"></div>
              )}

              {contactData.messages.meta.new_messages.users[data.id] !==
                undefined && (
                <div className="-mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                  <span className={`h-auto font-mukta text-xs text-gray-200`}>
                    {contactData.messages.meta.new_messages.users[data.id]}
                  </span>
                </div>
              )}
            </div>

            <div className="flex h-1/2 w-full flex-row justify-between pr-2">
              <span
                className={`${
                  data.unread_messages > 0 ? "text-white" : "text-gray-500"
                } h-auto max-w-[150px] truncate font-mukta text-sm `}
              >
                {`${
                  user.id == data.messages.data[0].author
                    ? `Ty: `
                    : `${data.username}: `
                } ${data.messages.data[0].content}`}
              </span>
              {data.messages.data[0].status == "is_send" ? (
                <CheckCircleIconSend
                  className={`h-4 w-4  shrink-0 text-blue-400 `}
                ></CheckCircleIconSend>
              ) : (
                <CheckCircleIcon
                  className={`h-4 w-4  shrink-0 text-blue-400 `}
                ></CheckCircleIcon>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full w-4/5 flex-row items-center space-x-2 pl-2">
            <span className={`text-md h-auto font-mukta text-gray-200`}>
              {data.username}
            </span>
            {contactData.online_friends.includes(data.id) && (
              <div className="-mt-1 flex h-4 w-4 rounded-full bg-green-400"></div>
            )}
            {contactData.messages.meta.new_messages.users[data.id] !==
              undefined && (
              <div className="-mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                <span className={`h-auto font-mukta text-xs text-gray-200`}>
                  {contactData.messages.meta.new_messages.users[data.id]}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  function renderNotification(index, data, new_notifications) {
    function modeChooser(mode, obj) {
      if (mode == "MyUser") {
        return [
          obj.username,
          `/user/${obj.username}?type=future&events_category=all`,
        ];
      } else if (mode == "IPAddress") {
        return [obj.ip_address, "/settings"];
      } else if (mode == "Event") {
        return [obj.title, `/event/${obj.slug}-${obj.uuid}`];
      } else if (mode == "CommentEvent") {
        return [obj.text, `/event/${obj.slug}-${obj.uuid}`];
      } else if (mode == "Badge") {
        return [obj.name, `/create_badges`];
      } else if (mode == "Ticket") {
        return [obj.ticket_type, `/my_tickets`];
      } else if (mode == "Order") {
        return ["ZWROT", `/my_tickets`];
      } else if (mode == "AwaitingsTicketsRefund") {
        return [
          `+${parseFloat(obj.amount).toFixed(2)} zł ze zwrotów`,
          `/settings`,
        ];
      } else if (mode == "GatewayPaycheck") {
        return [
          `+${parseFloat(obj.amount).toFixed(2)} zł przyznane`,
          `/my_tickets`,
        ];
      }
    }

    let extraData;

    extraData = modeChooser(data.object_type, data.object);

    return (
      <div
        className={`${
          index < new_notifications
            ? "bg-gray-500 hover:bg-gray-400"
            : "bg-gray-800 hover:bg-gray-700"
        } 
        flex h-16 w-full cursor-pointer flex-row rounded-xl transition duration-150 ease-in-out`}
        key={index}
        onClick={() => history(extraData[1])}
      >
        <div className="flex h-full w-1/3 flex-col items-center justify-center space-y-3">
          <div className="flex h-2/3 w-8 items-end justify-center">
            <img
              src={`${ips_config.BACKEND}${data.object.image_thumbnail}`}
              className={`h-8 w-8 rounded-full object-cover`}
            ></img>
          </div>

          <div className="flex h-1/3 w-full items-start justify-center">
            <span
              className={`h-auto text-right font-mukta text-[7px] text-gray-200`}
            >
              {moment(data.created_at).fromNow()}
            </span>
          </div>
        </div>

        <div className="flex h-full w-2/3 flex-col items-center space-y-1 pl-2">
          <div className="flex h-1/2 w-full items-center">
            <span
              className={`h-auto w-full truncate pr-2 text-left font-mukta text-sm ${
                index < new_notifications ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {extraData[0]}
            </span>
          </div>
          <div className="flex h-1/2 w-full items-center pr-1">
            <span
              className={`h-auto text-left font-mukta text-[10px] text-gray-200`}
            >
              {data.text}
            </span>
          </div>
        </div>
      </div>
    );
  }

  function renderUserInvitation(data) {
    return (
      <div
        className={`flex h-16 w-full flex-row divide-x-2 divide-gray-600 rounded-xl bg-gray-500`}
        key={data.id}
      >
        <Link
          to={`/user/${data.username}`}
          className="flex h-full w-4/5 cursor-pointer flex-row items-center space-x-3 rounded-l-xl pl-2 hover:bg-gray-400"
        >
          <img
            src={`${ips_config.BACKEND}${data.image_thumbnail}`}
            className={`h-8 w-8 rounded-full object-cover`}
          ></img>
          <span className={`text-md h-auto font-mukta text-gray-200`}>
            {data.username}
          </span>
        </Link>

        <div className="flex h-full w-1/5 flex-col items-center justify-center space-y-2 rounded-r-xl">
          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-green-500 via-green-400 to-green-300">
            <PlusIcon
              className={`h-4 w-4 text-white `}
              onClick={() =>
                dispatch(friend_request_reaction(data.id, "accept", xcsrftoken))
              }
            ></PlusIcon>
          </div>
          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-br from-red-500 via-red-400 to-red-400">
            <MinusIcon
              className={`h-4 w-4 text-white `}
              onClick={() =>
                dispatch(friend_request_reaction(data.id, "reject", xcsrftoken))
              }
            ></MinusIcon>
          </div>
        </div>
      </div>
    );
  }

  function moduleInvitation(data) {
    return (
      <div
        className={`flex w-full flex-col divide-y-2 divide-gray-900 overflow-auto rounded-xl bg-gray-600 
        ${wrapper.show_invitations == false && "h-12"}
        ${
          wrapper.show_invitations &&
          data.meta.all_ids.length == 1 &&
          "h-[110px]"
        }
        ${
          wrapper.show_invitations &&
          data.meta.all_ids.length == 2 &&
          "h-[185px]"
        }
        ${
          wrapper.show_invitations &&
          data.meta.all_ids.length > 2 &&
          "h-[260px]"
        }
        `}
      >
        <div className="flex h-12 w-full items-center justify-between px-2">
          <span
            className={`text-md h-auto text-center font-mukta text-gray-200`}
          >
            {`Nowe zaproszenia - ${data.meta.all_ids.length}`}
          </span>
          {wrapper.show_invitations == true ? (
            <MinusIcon
              className={`h-6 w-6 cursor-pointer text-red-400 `}
              onClick={() => dispatch(change_state_invitations())}
            ></MinusIcon>
          ) : (
            <PlusIcon
              className={`h-6 w-6 cursor-pointer text-red-400 `}
              onClick={() => dispatch(change_state_invitations())}
            ></PlusIcon>
          )}
        </div>
        {wrapper.show_invitations == true && (
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
            renderView={({ style, props }) => (
              <div
                {...props}
                style={{ ...style }}
                id="scrollableDivInvitations"
              ></div>
            )}
          >
            <InfiniteScroll
              dataLength={contactData.friends.meta.invitations.data.length}
              next={() => infiniteLoadInvitations()}
              hasMore={
                !contactData.friends.meta.invitations.meta.end_pagination
              }
              scrollableTarget="scrollableDivInvitations"
            >
              <div className="flex h-auto flex-col space-y-2 p-1 pr-3">
                {contactData.friends.meta.invitations.data.map((data) =>
                  renderUserInvitation(data)
                )}
              </div>
            </InfiniteScroll>
          </Scrollbars>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${
        menuStatus ? "left-32 sm:left-44" : "left-14"
      } h-max-screen fixed top-14 z-30 flex h-screen w-60 flex-col divide-y-4 divide-gray-900 rounded-r-xl bg-gray-800 shadow-xl`}
    >
      <div className="flex h-16 w-full flex-row items-center">
        <div className="flex h-full w-1/4"> </div>

        <div className="flex h-full w-1/2 items-center justify-center">
          <span className={`h-auto font-mukta text-xl text-gray-200`}>
            {title[contactStatus.content]}
          </span>
        </div>

        <div className="flex h-full w-1/4 items-center justify-center">
          <ArrowCircleRightIcon
            className={`h-8 w-8 rotate-180 cursor-pointer text-red-400 `}
            onClick={() => dispatch(change_state_contact("off"))}
          ></ArrowCircleRightIcon>
        </div>
      </div>

      <div className="flex h-7/8 bg-gray-900 py-1">
        {contactData[contactStatus.content]?.data.length > 0 ? (
          <Scrollbars
            ref={scrollbarsWebsocketsRef}
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
            renderView={({ style, props }) => (
              <div
                {...props}
                style={{ ...style }}
                id="scrollableDivContact"
              ></div>
            )}
          >
            <InfiniteScroll
              dataLength={contactData[contactStatus.content].data.length}
              next={() => infiniteLoadEvents()}
              hasMore={!contactData[contactStatus.content].meta.end_pagination}
              scrollableTarget="scrollableDivContact"
            >
              <div className="max-h-screen flex flex-col space-y-2 pl-2 pr-3">
                {contactStatus.content == "friends" &&
                  contactData.friends.meta.invitations.meta.all_ids.length >
                    0 &&
                  moduleInvitation(contactData.friends.meta.invitations)}

                {contactData[contactStatus.content].data.map((data, index) =>
                  contactStatus.content == "notifications"
                    ? renderNotification(
                        index,
                        data,
                        contactData.notifications.meta.new_count
                      )
                    : renderUser(data)
                )}
              </div>
            </InfiniteScroll>
          </Scrollbars>
        ) : (
          <div className="flex h-auto w-full flex-col items-center justify-start space-y-2">
            {contactStatus.content == "friends" &&
              contactData.friends?.meta.invitations.meta.all_ids.length > 0 &&
              moduleInvitation(contactData.friends.meta.invitations)}
            <span className={`h-auto font-mukta text-xl text-gray-200`}>
              {contactStatus.content == "messages" && "Brak wiadomości"}
              {contactStatus.content == "friends" && "Brak znajomych"}
              {contactStatus.content == "notifications" && "Brak powiadomień"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
