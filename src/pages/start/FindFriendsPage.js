import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { find_friends, find_friends_next } from "../../actions/data";
import { getFindFriends, getXCSRFToken } from "../../selectors";
import InfiniteScroll from "react-infinite-scroll-component";
import useFindFriendsPage from "../../hooks/useFindFriendsPage";

function FindFriendsPage({ endProvider }) {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);
  let data_find_friends = useSelector(getFindFriends);
  const [
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
  ] = useFindFriendsPage();

  return (
    <Dashboard>
      <div
        className={` flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-4`}
      >
        {endProvider ? (
          <div className="flex h-full w-9/10 flex-col space-y-6 pt-12 md:w-4/5">
            <span className="h-auto text-center font-mukta text-xl text-gray-100 md:text-start md:text-3xl">
              Szukaj nowych znajomych
            </span>

            <form
              className="flex w-full flex-row justify-center pt-8"
              onSubmit={(e) => {
                e.preventDefault();
                setExcludedIds([]);
                setOpenModalTogetherFriends({});
                setOpenModalAcceptFriend({});
                setSearchingUsernames(valueInputUsername);
                dispatch(find_friends(valueInputUsername, "", xcsrftoken));
              }}
            >
              <input
                type="text"
                id="usernameFindFriendsInput"
                name="find_friends"
                value={valueInputUsername}
                onChange={handleValueChange}
                placeholder="Podaj pseudonim użytkownika"
                className="grow rounded-l-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-white focus:ring-0 md:text-lg"
              ></input>

              <button
                type="submit"
                className="rounded-r-md bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-5 py-1 text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-0 focus:ring-sky-800 md:text-lg"
              >
                <p className="font-mukta text-sm font-bold">Szukaj</p>
              </button>
            </form>
            {data_find_friends?.count !== undefined && (
              <p className="w-full py-5 font-mukta text-sm font-bold text-white md:text-2xl">
                Znaleziono {data_find_friends.count} użytkowników.
              </p>
            )}

            <InfiniteScroll
              dataLength={
                data_find_friends?.data.length == undefined
                  ? 0
                  : data_find_friends.data.length
              }
              next={() =>
                dispatch(
                  find_friends_next(searchingUsernames, excludedIds, xcsrftoken)
                )
              }
              hasMore={infiniteHasMore()}
            >
              <div
                className={`${
                  data_find_friends?.data.length == undefined && "pt-7"
                } flex h-auto w-full flex-col items-center divide-y-2 divide-blue-500`}
              >
                {data_find_friends?.data !== undefined &&
                  searchingResult(data_find_friends.data)}
              </div>
            </InfiniteScroll>
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

export default FindFriendsPage;
