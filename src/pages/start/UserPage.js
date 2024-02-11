import React from "react";
import { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import "moment/locale/pl";
import { events_user } from "../../actions/data";
import useUserPage from "../../hooks/useUserPage";
import ips_config from "../../ips_config";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";

moment.locale("pl");

function UserPage({
  activeUser,
  userEvents,
  values,
  endProvider,
  xcsrftoken,
  searchFriend,
  setSearchFriend,
  friendsList,
  setFriendsList,
}) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [
    setActivePage,
    valueInput,
    setValueInput,
    menuEventsCategory,
    setMenuEventsRoll,
    actionButtons,
    nextPageNavigation,
    eventTemplate,
    openModalDeleteFriend,
    openModalBlocked,
    modalDelete,
    modalBlocked,
    renderFriendsInfo,
    renderFriendsModels,
    renderBadgesInfo,
    renderBadgesModels,
    showWrapper,
    setShowWrapper,
  ] = useUserPage();

  let events_type = {
    "Organizowane przez użytkownika": "created_future",
    "Zorganizowane przez użytkownika": "created_past",
    "Na których się pojawi": "future",
    "W których wziął udział": "past",
  };

  let user_events_type = {
    "Oczekujące na akceptacje": "awaiting",
    "Wymagające poprawy": "need_improvement",
    "Odrzucone wydarzenia": "rejected",
  };

  useEffect(() => {
    // FILTROWANIE ZNAJOMYCH PO WPROWADZONYM INPUCIE DO SZUKANIA ZNAJOMYCH

    if (activeUser !== null) {
      let filtered_friends_together;
      if (activeUser.friendslist_together !== null) {
        filtered_friends_together = activeUser.friendslist_together.filter(
          (friend) =>
            friend.username.toLowerCase().includes(searchFriend.toLowerCase())
        );
      } else {
        filtered_friends_together = null;
      }

      let filtered_friends_strange = activeUser.friendslist_strange.filter(
        (friend) =>
          friend.username.toLowerCase().includes(searchFriend.toLowerCase())
      );

      setFriendsList({
        friendslist_together: filtered_friends_together,
        friendslist_strange: filtered_friends_strange,
      });
    }
  }, [searchFriend, activeUser?.friendslist_strange]);

  useEffect(() => {
    if (values !== null) {
      if (values.page == undefined) {
        setActivePage(1);
      } else {
        setActivePage(parseInt(values.page));
      }
      setValueInput(values);
    }
  }, [values]);

  useEffect(() => {
    if (valueInput?.type !== undefined) {
      setMenuEventsRoll(valueInput?.type);
    }
  }, [userEvents]);

  useEffect(() => {
    if (endProvider == true) {
      var urlParams = new URLSearchParams(valueInput).toString();

      dispatch(events_user(activeUser.username, valueInput));

      setActivePage(1);
      history(`/user/${activeUser.username}?${urlParams}`);
    }
  }, [valueInput?.events_category, valueInput?.type]);

  useEffect(() => {
    if (endProvider == true && userEvents.meta.count > 1) {
      var urlParams = new URLSearchParams(valueInput).toString();
      dispatch(events_user(activeUser.username, valueInput));
      setActivePage(1);
      history(`/user/${activeUser.username}?${urlParams}`);
    }
  }, [valueInput?.ordering]);

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-8`}
      >
        {endProvider ? (
          <div className="max-w-screen-xl flex h-full w-11/12 flex-col space-y-6 px-2 pt-8 sm:px-0 md:space-y-10 lg:pt-16 xl:w-3/4">
            <div
              id="dane o uzytkowniku"
              className="flex-basis flex h-32 w-full flex-row justify-between space-x-4 bg-gradient-to-r from-slate-700 to-gray-600 px-6 xs:px-4"
            >
              <div className="flex flex-col items-center py-2 sm:flex-row sm:space-x-5 sm:py-4">
                <img
                  src={`${ips_config.BACKEND}${activeUser.image_thumbnail}`}
                  className="h-14 w-14 rounded-full object-cover sm:h-24 sm:w-24 xs:h-10 xs:w-10"
                ></img>
                <div className="flex h-full w-auto flex-col items-center justify-between sm:space-y-2 xs:pt-1.5">
                  <div className="flex flex-row space-x-2 sm:space-x-3">
                    <span className="font-mukta text-lg font-bold text-gray-200 sm:text-2xl xs:text-base">
                      {activeUser.username}
                    </span>
                    <span className="mt-0.5 font-mukta text-base text-gray-400 sm:text-xl xs:text-sm">
                      {`(${activeUser.first_name})`}
                    </span>
                  </div>
                  {activeUser.main_badge_data !== null ? (
                    <div className="flex h-full w-full items-center justify-center sm:justify-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-blue-300 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-700 sm:h-14 sm:w-14">
                        <img
                          src={`${ips_config.BACKEND}/media/${activeUser.main_badge_data.image}`}
                          className="h-6 w-6 rounded-full object-cover sm:h-10 sm:w-10"
                        ></img>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 flex w-auto items-center justify-center pb-1 sm:pb-4">
                      <span className="font-mukta text-[10px] text-gray-400 sm:text-sm">
                        Brak aktywnej odznaki
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center justify-evenly lg:flex-row lg:space-x-5">
                {actionButtons(activeUser, xcsrftoken)}
              </div>
            </div>

            <div className="flex h-full w-full flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-10">
              <div className="flex h-auto w-full shrink-0 grow flex-col space-y-5 lg:w-[320px] lg:space-y-9">
                {/* ------------------------------ */}

                <div
                  id="wydarzenia"
                  className={`flex h-auto w-auto flex-col items-center space-y-1 divide-y-2 divide-blue-400 rounded-lg bg-slate-700 drop-shadow-3xl`}
                >
                  <div className="flex h-full w-full flex-row items-center">
                    <div className="flex h-full w-full"></div>
                    <span className="h-auto py-1 font-mukta text-lg text-gray-200 sm:text-xl">
                      Wydarzenia:
                    </span>
                    <div className="flex h-full w-full items-center justify-end pt-1 pr-2">
                      {showWrapper.events ? (
                        <MinusIcon
                          className="h-6 w-6 cursor-pointer text-red-500"
                          onClick={() => {
                            setShowWrapper({
                              ...showWrapper,
                              events: !showWrapper.events,
                            });
                          }}
                        />
                      ) : (
                        <PlusIcon
                          className="h-6 w-6 cursor-pointer text-green-500"
                          onClick={() => {
                            setShowWrapper({
                              ...showWrapper,
                              events: !showWrapper.events,
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {showWrapper.events && (
                    <div className="flex h-auto w-full flex-col rounded-b-lg">
                      {menuEventsCategory(
                        events_type,
                        user_events_type,
                        userEvents,
                        activeUser.username
                      )}
                    </div>
                  )}
                </div>

                {/* ------------------------------ */}

                <div
                  id="odznaki"
                  className="flex h-auto w-auto flex-col items-center divide-y-2 divide-blue-400  rounded-lg bg-slate-700 drop-shadow-3xl"
                >
                  {renderBadgesInfo(activeUser)}

                  {showWrapper.badges && renderBadgesModels(activeUser)}
                </div>

                {/* ------------------------------ */}

                <div
                  id="znajomi"
                  className="flex h-auto w-auto flex-col items-center divide-y-2 divide-blue-400  rounded-lg bg-slate-700 drop-shadow-3xl"
                >
                  {renderFriendsInfo(activeUser)}

                  {((activeUser.friendslist_together != null &&
                    activeUser.friendslist_together?.length > 0) ||
                    activeUser.friendslist_strange?.length > 0) &&
                    showWrapper.friends && (
                      <input
                        disabled={
                          (activeUser.friendslist_together?.length == 0 ||
                            activeUser.friendslist_together == null) &&
                          activeUser.friendslist_strange.length == 0
                        }
                        type="text"
                        placeholder="Znajdź znajomego..."
                        className="flex h-6 w-full border-r-0 border-l-0 bg-slate-600 py-1 text-sm text-gray-200 focus:ring-0"
                        value={searchFriend}
                        onChange={(e) => setSearchFriend(e.target.value)}
                      />
                    )}
                  {showWrapper.friends &&
                    renderFriendsModels(activeUser, friendsList, searchFriend)}
                </div>

                {/* ------------------------------ */}
              </div>

              <div className="flex h-full w-full flex-col space-y-4">
                <div className="flex w-full flex-col-reverse md:flex-col-reverse lg:justify-between 2xl:flex-row ">
                  <div className="flex inline-flex h-full items-end justify-center -space-x-[2px] pt-3 2xl:pt-0">
                    {nextPageNavigation(userEvents, activeUser.username)}
                  </div>

                  <div className="flex w-full items-center justify-center lg:w-auto 2xl:justify-end">
                    <div className="flex w-auto flex-col space-y-1">
                      <label
                        htmlFor="orderingEventsListSelect"
                        className="font-mukta text-sm text-gray-200 lg:text-base"
                      >
                        Sortuj
                      </label>
                      <select
                        id="orderingEventsListSelect"
                        value={valueInput.ordering}
                        onChange={(e) =>
                          setValueInput({
                            ...valueInput,
                            ordering: e.target.value,
                            page: 1,
                          })
                        }
                        className="h-[40px] w-[192px] rounded-md border-2 border-blue-400 bg-transparent font-mukta text-[13px] text-gray-200 lg:h-[44px] lg:w-[223px] lg:text-base"
                      >
                        <option
                          value="newest"
                          className="font-mukta text-black"
                        >
                          Od najnowszych
                        </option>
                        <option
                          value="popularity"
                          className="font-mukta text-black"
                        >
                          Od najpopularniejszych
                        </option>
                        <option
                          value="event_date"
                          className="font-mukta text-black"
                        >
                          Od najbliższych czasowo
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex h-auto w-full flex-wrap justify-center">
                  {userEvents.meta.count == 0 ? (
                    <div className="mt-1 flex h-40 grow items-center justify-center rounded-lg bg-gradient-to-bl from-gray-600 via-gray-700 to-gray-800 shadow-blue-500/30 drop-shadow-2xl">
                      <span className="px-3 text-center font-mukta text-base text-gray-200 lg:text-xl xs:text-base">
                        Nie znaleziono żadnego wydarzenia
                      </span>
                    </div>
                  ) : (
                    userEvents.data.map((event) => eventTemplate(event))
                  )}
                </div>
              </div>
            </div>
            {openModalDeleteFriend &&
              modalDelete(activeUser.username, activeUser.id, xcsrftoken)}
            {openModalBlocked.status && modalBlocked()}
          </div>
        ) : (
          <div className="flex w-full grow items-center justify-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        )}
      </div>
    </Dashboard>
  );
}

export default UserPage;
