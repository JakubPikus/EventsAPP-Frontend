import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFindFriends, getXCSRFToken } from "../selectors";
import {
  CheckIcon,
  UserIcon,
  DatabaseIcon,
  LocationMarkerIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import {
  friend_request,
  friend_request_reaction,
  friend_remove,
} from "../actions/data";
import ips_config from "../ips_config";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useFindFriendsPage() {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);
  let data_find_friends = useSelector(getFindFriends);
  const [valueInputUsername, setValueInputUsername] = useState("");
  const [searchingUsernames, setSearchingUsernames] = useState("");
  const [openModalTogetherFriends, setOpenModalTogetherFriends] = useState({});
  const [openModalAcceptFriend, setOpenModalAcceptFriend] = useState({});
  const [openModalDeleteFriend, setOpenModalDeleteFriend] = useState({
    status: false,
    username: null,
    id: null,
  });
  const [openModalBlocked, setOpenModalBlocked] = useState({
    status: false,
    username: null,
  });
  const [excludedIds, setExcludedIds] = useState([]);

  useEffect(() => {
    if (data_find_friends?.data !== undefined) {
      let ids_arrays = [];
      data_find_friends.data.forEach((obj) => ids_arrays.push(obj.id));
      setExcludedIds(ids_arrays);
    }
  }, [data_find_friends?.data]);

  useEffect(() => {
    if (data_find_friends?.not_valid !== undefined) {
      setOpenModalBlocked({
        status: true,
        username: data_find_friends.not_valid.username,
      });
    }
  }, [data_find_friends?.not_valid]);

  const handleValueChange = (e) => {
    setValueInputUsername(e.target.value);
  };

  function searchingResult(data) {
    if (data !== null) {
      if (data.length > 0) {
        return data.map((user) => userTemplate(user));
      } else {
        return (
          <span className="h-10 pr-2 text-center font-mukta text-lg text-gray-100">
            Nie został znaleziony żaden użytkownik z takim pseudonimem.
          </span>
        );
      }
    }
  }

  function userTemplate(user) {
    return (
      <div
        className="flex h-auto w-full flex-col items-center justify-center p-2 lg:flex-row  lg:space-x-2 xl:w-4/5"
        key={user.id}
      >
        <div className="flex h-auto w-full flex-row items-center justify-evenly space-x-2 lg:w-auto lg:justify-start lg:space-x-0">
          <div className="flex h-28 w-32 flex-col items-center justify-center space-y-2">
            <Link
              to={`/user/${user.username}`}
              className="flex h-12 w-12 overflow-hidden rounded-full md:h-16 md:w-16"
            >
              <img
                src={`${ips_config.BACKEND}${user.image_thumbnail}`}
                className="h-12 w-12 object-cover transition ease-in-out hover:scale-110 md:h-16 md:w-16"
              ></img>
            </Link>

            <Link to={`/user/${user.username}`} className=" flex items-center">
              <span className="h-auto w-fit cursor-pointer font-mukta text-xs text-gray-200 hover:bg-slate-400 hover:text-black md:text-sm">
                {user.username}
              </span>
            </Link>
          </div>
          <div className="-mt-6 block flex h-9 w-44 items-center justify-center lg:hidden">
            {friendRequestButton(user, true, xcsrftoken)}
          </div>
        </div>
        <div className="flex h-auto w-full flex-col  items-center justify-evenly gap-2 sm:flex-row lg:flex-col xl:flex-wrap">
          <div className="flex h-28 w-full flex-row justify-between lg:justify-evenly">
            <div className="flex h-28 w-1/2 flex-col items-center space-y-2 py-3  lg:w-44 lg:items-start">
              <UserIcon className="-ml-1 h-6 w-6 text-gray-300" />
              <div className="flex h-full flex-col items-center space-y-1 lg:items-start">
                <span className="h-auto w-fit text-center font-mukta text-xs  text-gray-100 lg:text-start lg:text-sm ">
                  {`Imię:  ${user.first_name}`}
                </span>
                <span className="h-auto w-fit text-center font-mukta text-xs  text-gray-100 lg:text-start lg:text-sm ">
                  {`Nazwisko:  ${user.last_name}`}
                </span>
              </div>
            </div>

            <div className="flex h-28 w-1/2 flex-col items-center space-y-2 py-3  lg:w-44 lg:items-start">
              <LocationMarkerIcon className="-ml-1 h-6 w-6 text-gray-300" />
              <div className="flex h-full flex-col items-center space-y-1 lg:items-start">
                <span className="h-auto w-fit text-center font-mukta text-xs text-gray-100 lg:text-start lg:text-sm ">
                  {user.city}
                </span>
                <span className="h-auto w-fit text-center font-mukta text-xs text-gray-400 lg:text-start lg:text-sm ">
                  {user.province}
                </span>
              </div>
            </div>
          </div>

          <div className="flex h-28  w-full flex-row justify-between lg:justify-evenly">
            {openModalTogetherFriends[user.id] == undefined ? (
              <div className="flex h-28 w-1/2 flex-col items-center space-y-2 py-3  lg:w-44 lg:items-start">
                <UserGroupIcon className="-ml-1 h-6 w-6 text-gray-300" />

                <div className="flex h-full flex-col items-center space-y-1 lg:items-start">
                  <span className="h-auto w-fit font-mukta text-xs text-gray-100 lg:text-sm ">
                    {`${user.friends_count} znajomych`}
                  </span>
                  {user.together_friends.length > 0 && (
                    <span
                      className="h-auto w-fit cursor-pointer font-mukta text-xs text-gray-200 underline lg:text-[12px] "
                      onClick={() => {
                        setOpenModalTogetherFriends({
                          ...openModalTogetherFriends,
                          [user.id]: true,
                        });
                      }}
                    >
                      {`(w tym ${user.together_friends.length} wspólnych)`}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-28 w-1/2 lg:w-44 ">
                {modalTogetherFriends(
                  user,
                  openModalTogetherFriends,
                  setOpenModalTogetherFriends
                )}
              </div>
            )}

            <div className="flex h-28 w-1/2 flex-col items-center space-y-2 py-3 lg:w-44 lg:items-start">
              <DatabaseIcon className="-ml-1 h-6 w-6 text-gray-300" />
              <div className="flex h-full  flex-col items-center space-y-1 lg:items-start">
                <span className="h-auto w-fit font-mukta text-xs text-gray-100 lg:text-sm ">
                  {`${user.events_count} wydarzeń`}
                </span>
                {user.events_actual_count > 0 && (
                  <Link
                    to={`/user/${user.username}?type=created_future`}
                    className="flex h-auto w-fit "
                  >
                    <span className="h-auto w-fit cursor-pointer font-mukta text-[12px] text-gray-200 underline ">
                      {`(w tym ${user.events_actual_count} aktualnych)`}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex hidden h-9 w-44 items-center justify-center lg:block">
          {friendRequestButton(user, false, xcsrftoken)}
        </div>
        {openModalDeleteFriend.status &&
          modalDelete(
            openModalDeleteFriend.username,
            openModalDeleteFriend.id,
            xcsrftoken
          )}
        {openModalBlocked.status && modalBlocked()}
      </div>
    );
  }

  function friendRequestButton(data, status, xcsrftoken) {
    let state = data.is_friend;

    if (state == "a) Get_block") {
      return (
        <div className="flex h-9 w-36 items-center justify-center rounded-lg border-2  border-red-500 bg-gray-700 px-2 text-xs lg:h-12 lg:w-40 lg:text-sm">
          <span className="text-center font-mukta text-[12px] text-gray-300">
            Jesteś zablokowany przez tego użytkownika
          </span>
        </div>
      );
    } else if (state == "a) True") {
      return (
        <button
          className="h-7 w-36 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-1 text-center text-xs font-medium text-white shadow-lg shadow-red-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 lg:h-9 lg:w-40 lg:text-sm "
          onClick={() =>
            setOpenModalDeleteFriend({
              status: true,
              username: data.username,
              id: data.id,
            })
          }
        >
          Usuń ze znajomych
        </button>
      );
    } else if (state == "d) False") {
      return (
        <button
          className="h-7 w-36 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 py-1 text-center text-xs font-medium text-white shadow-lg shadow-green-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-300 lg:h-9 lg:w-40 lg:text-sm "
          onClick={() => dispatch(friend_request(data.id, "Send", xcsrftoken))}
        >
          Dodaj do znajomych
        </button>
      );
    } else if (state == "b) Send_request") {
      return (
        <button
          className="h-7 w-36 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-1 text-center text-xs font-medium text-gray-500 shadow-lg shadow-yellow-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-yellow-300 lg:h-9 lg:w-40 lg:text-sm"
          onClick={() =>
            dispatch(friend_request(data.id, "Cancel", xcsrftoken))
          }
        >
          Wysłano zaproszenie
        </button>
      );
    } else if (state == "c) Get_request") {
      return (
        <div className={`${status && "mt-[92px]"} flex h-32 flex-col`}>
          <button
            className={`${
              openModalAcceptFriend[data.id]
                ? "from-orange-600 via-orange-700 to-orange-800 focus:ring-orange-400"
                : "from-orange-400 via-orange-500 to-orange-600 focus:ring-orange-300"
            } h-7 w-36 rounded-lg bg-gradient-to-r py-1 text-center text-xs font-medium text-white shadow-lg shadow-orange-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 lg:h-9 lg:w-40 lg:text-sm`}
            onClick={() => {
              if (!openModalAcceptFriend[data.id]) {
                setOpenModalAcceptFriend({
                  ...openModalAcceptFriend,
                  [data.id]: true,
                });
              } else {
                const { [data.id]: _, ...rest } = openModalAcceptFriend;
                setOpenModalAcceptFriend(rest);
              }
            }}
          >
            Otrzymano zaproszenie
          </button>
          {openModalAcceptFriend[data.id] &&
            modalRequestReaction(
              data,
              openModalAcceptFriend,
              setOpenModalAcceptFriend,
              xcsrftoken
            )}
        </div>
      );
    }
  }

  // MODALE

  function modalRequestReaction(
    data,
    openModalAcceptFriend,
    setOpenModalAcceptFriend,
    xcsrftoken
  ) {
    return (
      <div className="z-20 mt-2 flex h-16 w-36 flex-col divide-y divide-blue-400 rounded-lg lg:w-40">
        <div
          className="flex h-8 cursor-pointer flex-row items-center space-x-2 rounded-t-lg bg-slate-700 px-2 hover:bg-slate-500"
          onClick={() => {
            dispatch(friend_request_reaction(data.id, "accept", xcsrftoken));
            const { [data.id]: _, ...rest } = openModalAcceptFriend;
            setOpenModalAcceptFriend(rest);
          }}
        >
          <CheckIcon className="h-6 w-6 text-green-500" />
          <span className="font-mukta text-sm text-gray-200">Potwierdź</span>
        </div>
        <div
          className="flex h-8 cursor-pointer flex-row items-center space-x-2 rounded-b-lg bg-slate-700 px-2 hover:bg-slate-500"
          onClick={() => {
            dispatch(friend_request_reaction(data.id, "reject", xcsrftoken));
            const { [data.id]: _, ...rest } = openModalAcceptFriend;
            setOpenModalAcceptFriend(rest);
          }}
        >
          <XIcon className="h-6 w-6 text-red-500" />
          <span className="font-mukta text-sm text-gray-200">Odrzuć</span>
        </div>
      </div>
    );
  }

  function modalTogetherFriends(
    user,
    openModalTogetherFriends,
    setOpenModalTogetherFriends
  ) {
    return (
      <div className="flex h-28 w-40 flex-col overflow-hidden  rounded-xl bg-gray-900">
        <div className="flex h-6 w-full items-center justify-between bg-gradient-to-r from-gray-700 to-slate-600 ">
          <span className="h-auto w-fit pl-4 font-mukta text-[9px] text-gray-100 lg:text-[12px] ">
            {`Wspólni znajomi`}
          </span>
          <XIcon
            className="mr-2 h-5 w-5 cursor-pointer text-red-500"
            onClick={() => {
              const { [user.id]: _, ...rest } = openModalTogetherFriends;
              setOpenModalTogetherFriends(rest);
            }}
          />
        </div>

        <div className="flex h-full flex-row overflow-x-auto">
          {user.together_friends.map((friend) => (
            <div
              className="flex h-full w-[70px] min-w-70 flex-col items-center justify-center"
              key={friend.id}
            >
              <div className="flex w-full items-center justify-center pt-2">
                <Link
                  to={`/user/${friend.username}`}
                  className="flex h-10 w-10 overflow-hidden rounded-full"
                >
                  <img
                    src={`${ips_config.BACKEND}/media/${friend.image_thumbnail}`}
                    className="h-10 w-10 object-cover transition ease-in-out hover:scale-110"
                  ></img>
                </Link>
              </div>

              <div className="flex h-1/2 w-full items-center justify-center px-1">
                <Link
                  to={`/user/${friend.username}`}
                  className=" h-fut flex w-fit"
                >
                  <span className="break-anywhere h-auto w-fit max-w-60 cursor-pointer truncate text-center font-mukta text-[8px] text-gray-200 hover:bg-slate-400 hover:text-black">
                    {friend.username}
                  </span>
                </Link>
              </div>
            </div>
          ))}
          {user.friends_count !== user.together_friends.length && (
            <div className="flex h-full min-w-40 items-center justify-center">
              <span className="text-center font-mukta text-[12px] text-gray-200">
                {`+ ${user.friends_count - user.together_friends.length}`}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  function modalBlocked() {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-20"></div>

        <div className="z-30 flex w-1/2 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-1/4">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Zostałeś zablokowany
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalBlocked({ status: false, username: null });
              }}
            />
          </div>
          <div className="flex px-4">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Podczas próby wykonania akcji, zostałeś zablokowany przez użytkownika
              "${openModalBlocked.username}". Zniknie on z wyszukiwanych pozycji i będzie on dla Ciebie niewidoczny do momentu, aż Cię nie odblokuje.`}
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none lg:text-base"
              onClick={() => {
                setOpenModalBlocked({ status: false, username: null });
              }}
            >
              Zrozumiałem
            </button>
          </div>
        </div>
      </div>
    );
  }

  function modalDelete(username, id, xcsrftoken) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-20"></div>

        <div className="z-30 flex w-1/2 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 lg:w-1/4">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="test-sm text-white lg:text-lg">
              Usuwanie znajomego
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenModalDeleteFriend({
                  status: false,
                  username: null,
                  id: null,
                })
              }
            />
          </div>
          <div className="flex px-4">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Jesteś pewny, aby usunąć "${username}" ze znajomych ?`}
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none lg:text-base"
              onClick={() => {
                dispatch(friend_remove(id, xcsrftoken));
                setOpenModalDeleteFriend({
                  status: false,
                  username: null,
                  id: null,
                });
              }}
            >
              Tak, usuń
            </button>
          </div>
        </div>
      </div>
    );
  }

  function infiniteHasMore() {
    if (
      data_find_friends?.data !== undefined &&
      data_find_friends?.count !== undefined &&
      data_find_friends?.data.length < data_find_friends?.count
    ) {
      return true;
    }
    return false;
  }

  return [
    excludedIds,
    setExcludedIds,
    setOpenModalAcceptFriend,
    setOpenModalTogetherFriends,
    searchingUsernames,
    setSearchingUsernames,
    valueInputUsername,
    handleValueChange,
    infiniteHasMore,
    searchingResult,
  ];
}
export default useFindFriendsPage;
