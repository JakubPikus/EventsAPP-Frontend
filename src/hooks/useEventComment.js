import { useEffect, useState } from "react";

import {
  MinusSmIcon,
  PlusSmIcon,
  FlagIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  XIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import {
  ThumbUpIcon as ThumbUpIconOutline,
  ThumbDownIcon as ThumbDownIconOutline,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import "moment/locale/pl";
import {
  comment_event_reaction,
  comment_event_report,
  comment_event_post,
  comment_event_delete,
} from "../actions/data";
import ips_config from "../ips_config";
import { Link } from "react-router-dom";
import { getUser } from "../selectors";

moment.locale("pl");

function useEventComment() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  //DODAWANIE IKON REAKCJI LIVE PO FRONCIE ABY NIE PRZEŁADOWYWAĆ STRONY
  const [opinionComments, setOpinionComments] = useState([]);

  //DODAWANIE IKON REPORTÓW LIVE PO FRONCIE ABY NIE PRZEŁADOWYWAĆ STRONY
  const [reportComments, setReportComments] = useState([]);

  //LISTA KOMENTARZY DO ZWINIĘCIA
  const [hideComments, setHideComments] = useState([]);

  //CZY MODAL MA BYĆ OTWARTY DO ZGŁOSZENIA KOMENTARZA
  const [openReport, setOpenReport] = useState({
    status: false,
    comment: null,
  });

  //CZY MODAL MA BYĆ OTWARTY DO USUNIĘCIA KOMENTARZA
  const [openDelete, setOpenDelete] = useState({
    status: false,
    comment: null,
  });

  //DANE DO ZGŁOSZENIA KOMENTARZA
  const [report, setReport] = useState(null);

  //DANE DO PRZETRZYMYWANIA TREŚCI NOWEGO KOMENTARZA
  const [textAnswer, setTextAnswer] = useState([]);

  //DANE DO SPRAWDZANIA, CZY FORM DO ODPOWIEDZI MA BYĆ ROZWINIĘTY
  const [answerFormOpen, setAnswerFormOpen] = useState([]);

  const reportOptions = {
    1: "Treści reklamowe lub spam",
    2: "Materiały erotyczne i pornograficzne",
    3: "Wykorzystywanie dzieci",
    4: "Propagowanie terroryzmu",
    5: "Nękanie lub dokuczanie",
    6: "Nieprawdziwe informacje",
  };

  function commentReportIconProvider(comment, stateComment) {
    let temp;
    if (stateComment?.my_report !== undefined) {
      temp = stateComment;
    } else {
      temp = comment;
    }

    if (comment.is_blocked) {
      return <FlagIcon className="h-6 w-6 text-yellow-400" />;
    } else if (temp.my_report == null) {
      return (
        <FlagIcon
          className="h-6 w-6 cursor-pointer text-red-400"
          onClick={() => {
            reportComment(comment);
          }}
        />
      );
    } else {
      return <FlagIcon className="h-6 w-6 text-gray-400" />;
    }
  }

  function commentReactionIconRender(
    componentName,
    score,
    value,
    type,
    id,
    slug,
    uuid,
    xcsrfToken
  ) {
    const Component = eval(componentName);
    return (
      <Component
        className="h-5 w-5 cursor-pointer text-gray-100"
        onClick={() => {
          setOpinionComments((prevState) => ({
            ...prevState,
            [id]: {
              score: score + value,
              my_reaction: type,
            },
          }));
          dispatch(comment_event_reaction(xcsrfToken, id, type, slug, uuid));
        }}
      />
    );
  }

  function commentReactionIconProvider(
    comment,
    slug,
    uuid,
    stateComment,
    xcsrfToken
  ) {
    let temp;
    if (stateComment?.score !== undefined) {
      temp = stateComment;
    } else {
      temp = comment;
    }
    if (temp.my_reaction == "Like") {
      return (
        <>
          {commentReactionIconRender(
            ThumbUpIcon,
            temp.score,
            -1,
            "Delete",
            comment.id,
            slug,
            uuid,
            xcsrfToken
          )}
          <span className="font-mukta text-gray-300 ">{temp.score}</span>
          {commentReactionIconRender(
            ThumbDownIconOutline,
            temp.score,
            -2,
            "Dislike",
            comment.id,
            slug,
            uuid,
            xcsrfToken
          )}
        </>
      );
    } else if (temp.my_reaction == "Dislike") {
      return (
        <>
          {commentReactionIconRender(
            ThumbUpIconOutline,
            temp.score,
            2,
            "Like",
            comment.id,
            slug,
            uuid,
            xcsrfToken
          )}
          <span className="font-mukta text-gray-300 ">{temp.score}</span>
          {commentReactionIconRender(
            ThumbDownIcon,
            temp.score,
            1,
            "Delete",
            comment.id,
            slug,
            uuid,
            xcsrfToken
          )}
        </>
      );
    } else {
      return (
        <>
          {commentReactionIconRender(
            ThumbUpIconOutline,
            temp.score,
            1,
            "Like",
            comment.id,
            slug,
            uuid,
            xcsrfToken
          )}
          <span className="font-mukta text-gray-300 ">{temp.score}</span>
          {commentReactionIconRender(
            ThumbDownIconOutline,
            temp.score,
            -1,
            "Dislike",
            comment.id,
            slug,
            uuid,
            xcsrfToken
          )}
        </>
      );
    }
  }

  function openAnswer(id) {
    if (answerFormOpen[id] == undefined || answerFormOpen[id] == false) {
      setAnswerFormOpen((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setAnswerFormOpen((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  }

  function hideComment(id) {
    if (hideComments[id] == undefined || hideComments[id] == false) {
      setHideComments((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setHideComments((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  }

  function eventComment(
    comment,
    xcsrfToken,
    author_post,
    slug,
    uuid,
    event_status
  ) {
    return (
      <div className="flex flex-col">
        <div
          className={`${
            hideComments[comment.id] !== true && "pt-4"
          } flex h-auto w-full flex-row`}
        >
          <div
            id="avatar i kreski"
            className={`${
              hideComments[comment.id] == true ? "h-8 items-center" : "h-auto"
            } flex w-16 flex-col`}
          >
            <div
              className={`${
                hideComments[comment.id] == true
                  ? "h-8 w-8"
                  : "h-12 w-12 lg:h-16 lg:w-16"
              } flex`}
            >
              <Link
                to={`/user/${comment.author}`}
                className={`flex shrink-0 ${
                  hideComments[comment.id] == true
                    ? "h-8 w-8"
                    : "h-12 w-12 lg:h-16 lg:w-16"
                }`}
              >
                <img
                  src={`${ips_config.BACKEND}/media/${comment.author_image}`}
                  className={`rounded-full shrink-0 ${
                    hideComments[comment.id] == true
                      ? "h-8 w-8"
                      : "h-12 w-12 lg:h-16 lg:w-16"
                  }`}
                ></img>
              </Link>
            </div>
          </div>
          <div className="flex h-full w-full flex-col pl-3 pt-1">
            <div
              id="nick i znaczki"
              className="flex h-6 w-full flex-row items-center justify-between "
            >
              <div className="flex flex-row items-center space-x-3">
                <Link
                  to={`/user/${comment.author}`}
                  className="flex w-auto flex-row items-center space-x-1"
                >
                  <span className="font-mukta text-sm text-white lg:text-base">
                    {comment.author}
                  </span>
                  {comment.author == author_post && (
                    <span className="font-mukta text-[10px] text-gray-400 lg:text-[12px]">
                      (Organizator)
                    </span>
                  )}
                </Link>

                {hideComments[comment.id] == true && (
                  <span className="font-mukta text-xs text-gray-500 lg:text-sm">
                    {moment(comment.created_at).fromNow()}
                  </span>
                )}
              </div>

              <div className="flex flex-row space-x-3">
                {comment.author !== user.username &&
                  commentReportIconProvider(
                    comment,
                    reportComments[comment.id]
                  )}

                {(comment.author == user.username ||
                  author_post == user.username) && (
                  <TrashIcon
                    className="h-6 w-6 cursor-pointer text-red-400"
                    onClick={() => {
                      deleteComment(comment);
                    }}
                  />
                )}

                {hideComments[comment.id] == true ? (
                  <PlusSmIcon
                    className="h-6 w-6 cursor-pointer text-gray-300"
                    onClick={() => hideComment(comment.id)}
                  />
                ) : (
                  <MinusSmIcon
                    className="h-6 w-6 cursor-pointer text-gray-300"
                    onClick={() => hideComment(comment.id)}
                  />
                )}
              </div>
            </div>
            <div
              id="czas"
              className={`${
                hideComments[comment.id] == true && "hidden "
              } flex h-6 w-full`}
            >
              <span className="font-mukta text-xs text-gray-500 lg:text-sm">
                {moment(comment.created_at).fromNow()}
              </span>
            </div>

            {comment.is_blocked && (
              <div
                id="blocked"
                className={`${
                  hideComments[comment.id] == true && "hidden "
                } break-anywhere flex w-auto `}
              >
                <p className="font-mukta italic text-gray-500">
                  Komentarz został zablokowany przez administrację
                </p>
              </div>
            )}

            {comment.text_comment !== null && (
              <div
                id="tekst"
                className={`${
                  hideComments[comment.id] == true && "hidden "
                } break-anywhere flex w-auto `}
              >
                <p className="font-mukta text-sm text-gray-300 lg:text-base">
                  {comment.text_comment}
                </p>
              </div>
            )}
            <div
              id="lajki i answer"
              className={`${
                hideComments[comment.id] == true && "hidden "
              } flex flex-row items-center space-x-3 pl-3 pt-1`}
            >
              {commentReactionIconProvider(
                comment,
                slug,
                uuid,
                opinionComments[comment.id],
                xcsrfToken
              )}

              {event_status == "verificated" && (
                <div className="flex h-auto w-auto pl-4">
                  <span
                    className={`${
                      answerFormOpen[comment.id] !== true
                        ? "text-gray-500"
                        : "text-blue-400"
                    } cursor-pointer font-mukta text-sm lg:text-base`}
                    onClick={() => {
                      openAnswer(comment.id);
                    }}
                  >
                    Odpowiedz
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {answerFormOpen[comment.id] && !hideComments[comment.id] == true && (
          <div className="flex pl-16">
            {writeComment(
              slug,
              uuid,
              xcsrfToken,
              comment,
              comment.id,
              event_status
            )}
          </div>
        )}
      </div>
    );
  }
  // Do zmiany stanu otworzonego modala i zerowania wartości reporta
  function reportComment(comment) {
    if (comment == null) {
      setReport(null);
    } else {
      setReport((prevState) => ({
        ...prevState,
        id_comment: comment.id,
      }));
    }

    setOpenReport({ status: !openReport.status, comment: comment });
  }

  function deleteComment(comment) {
    setOpenDelete({ status: !openDelete.status, comment: comment });
  }

  function handleSubmit(xcsrfToken, slug, uuid) {
    setReportComments((prevState) => ({
      ...prevState,
      [report.id_comment]: {
        my_report: report.type,
      },
    }));
    dispatch(comment_event_report(report, slug, uuid, xcsrfToken));
    reportComment(null);
  }

  function handleInputReportChange(e) {
    // setReport({ type: e.target.value, id_comment: openReport.comment.id });

    setReport((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function commentRender(
    comments,
    xcsrfToken,
    author_post,
    slug,
    uuid,
    event_status
  ) {
    if (comments !== undefined) {
      return comments.map((comment) => (
        <div
          id="całość z odpowiedziami"
          key={comment.id}
          className={`${
            hideComments[comment.id] == true &&
            "mt-2 rounded-md border-2 border-blue-400 py-1"
          } flex h-full w-full flex-col`}
        >
          {eventComment(
            comment,
            xcsrfToken,
            author_post,
            slug,
            uuid,
            event_status
          )}
          {comment.replies.length > 0 && !hideComments[comment.id] == true && (
            <div className="flex flex-col pl-16">
              {commentRender(
                comment.replies,
                xcsrfToken,
                author_post,
                slug,
                uuid,
                event_status
              )}
            </div>
          )}
        </div>
      ));
    } else {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      );
    }
  }

  function modalReport(xcsrfToken, slug, uuid) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl xl:w-2/6">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Zgłaszanie komentarza
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => reportComment(null)}
            />
          </div>
          <div className="flex">
            <span className="font-mukta text-sm text-white lg:text-base">
              Zgłoś poniższy komentarz:
            </span>
          </div>
          <div className="flex px-8">
            <div className="flex rounded-md border-2 border-blue-400 p-4">
              <div className={`flex h-auto w-full flex-row`}>
                <div
                  id="avatar i kreski"
                  className={`flex h-auto w-16 flex-col`}
                >
                  <div className={`flex h-16 w-16`}>
                    <img
                      src={`${ips_config.BACKEND}/media/${openReport.comment.author_image}`}
                      className="rounded-full"
                    ></img>
                  </div>
                </div>
                <div className="flex h-full w-full flex-col pl-3 pt-1">
                  <div
                    id="nick i znaczki"
                    className="flex h-6 w-full flex-row items-center justify-between "
                  >
                    <span className="font-mukta text-sm text-white lg:text-base">
                      {openReport.comment.author}
                    </span>
                  </div>
                  <div id="czas" className={`flex h-6 w-full`}>
                    <span className="font-mukta text-sm text-gray-500">
                      {moment(openReport.comment.created_at).fromNow()}
                    </span>
                  </div>

                  <div id="tekst" className={`break-anywhere flex w-auto `}>
                    <p className="font-mukta text-sm text-gray-300 lg:text-base">
                      {openReport.comment.text_comment}
                    </p>
                  </div>

                  <div
                    id="lajki i answer"
                    className={`flex flex-row items-center space-x-3 pt-1`}
                  >
                    {commentReactionIconProvider(
                      openReport.comment,
                      slug,
                      uuid,
                      opinionComments[openReport.comment.id],
                      xcsrfToken
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {Object.entries(reportOptions).map(([key, value]) => (
              <div className="flex flex-row items-center space-x-2" key={key}>
                <input
                  type="radio"
                  name="type"
                  value={value}
                  onChange={handleInputReportChange}
                ></input>

                <label className="font-mukta text-sm text-gray-300 lg:text-base ">
                  {value}
                </label>
              </div>
            ))}
          </div>

          <div className="flex h-auto w-2/3 flex-col space-y-1">
            <textarea
              className="max-h-80 w-full resize-none rounded-lg border-2 border-gray-500 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 lg:text-base"
              placeholder="Opcjonalnie dodaj komentarz do swojego zgłoszenia wydarzenia"
              name="details"
              onChange={handleInputReportChange}
              maxLength="150"
            ></textarea>
            <div className="flex justify-end">
              <span
                className={`${
                  report?.details?.length > 125
                    ? "text-red-500"
                    : "text-gray-500"
                } font-mukta text-sm`}
              >
                {`${
                  report?.details !== undefined ? report?.details?.length : 0
                } / 150`}
              </span>
            </div>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              onClick={() => handleSubmit(xcsrfToken, slug, uuid)}
              disabled={report?.type == undefined}
            >
              Zgłoś
            </button>
          </div>
        </div>
      </div>
    );
  }

  function modalDelete(xcsrfToken, slug, uuid) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl xl:w-2/6">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Usuwanie komentarza
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => deleteComment(null)}
            />
          </div>
          <div className="flex">
            <span className="font-mukta text-sm text-white lg:text-base">
              Usuń poniższy komentarz:
            </span>
          </div>
          <div className="flex px-8">
            <div className="flex rounded-md border-2 border-blue-400 p-4">
              <div className={`flex h-auto w-full flex-row`}>
                <div
                  id="avatar i kreski"
                  className={`flex h-auto w-16 flex-col`}
                >
                  <div className={`flex h-16 w-16`}>
                    <img
                      src={`${ips_config.BACKEND}/media/${openDelete.comment.author_image}`}
                      className="rounded-full"
                    ></img>
                  </div>
                </div>
                <div className="flex h-full w-full flex-col pl-3 pt-1">
                  <div
                    id="nick i znaczki"
                    className="flex h-6 w-full flex-row items-center justify-between "
                  >
                    <span className="font-mukta text-sm text-white lg:text-base">
                      {openDelete.comment.author}
                    </span>
                  </div>
                  <div id="czas" className={`flex h-6 w-full`}>
                    <span className="font-mukta text-sm text-gray-500">
                      {moment(openDelete.comment.created_at).fromNow()}
                    </span>
                  </div>

                  {openDelete.comment.is_blocked && (
                    <div id="blocked" className={`break-anywhere flex w-auto `}>
                      <p className="font-mukta text-sm italic text-gray-500 lg:text-base">
                        Komentarz został zablokowany przez administrację
                      </p>
                    </div>
                  )}

                  {openDelete.comment.text_comment !== null && (
                    <div id="tekst" className={`break-anywhere flex w-auto `}>
                      <p className="font-mukta text-sm text-gray-300 lg:text-base">
                        {openDelete.comment.text_comment}
                      </p>
                    </div>
                  )}

                  <div
                    id="lajki i answer"
                    className={`flex flex-row items-center space-x-3 pt-1`}
                  >
                    {commentReactionIconProvider(
                      openDelete.comment,
                      slug,
                      uuid,
                      opinionComments[openDelete.comment.id],
                      xcsrfToken
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 px-3">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Jesteś pewny, żeby usunąć ten komentarz ?
            </span>
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Wraz z nim usuną się również wszystkie odpowiedzi na ten
              komentarz.
            </span>
          </div>
          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              onClick={() => {
                dispatch(
                  comment_event_delete(
                    xcsrfToken,
                    slug,
                    uuid,
                    openDelete.comment.id
                  )
                );
                deleteComment(null);
              }}
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    );
  }

  function writeComment(slug, uuid, xcsrfToken, comment, id, event_status) {
    function handleChangeTextarea(element) {
      element.target.style.height = "76px";
      element.target.style.height = `${element.target.scrollHeight + 4}px`;
      setTextAnswer((prevState) => ({
        ...prevState,
        [element.target.id]: element.target.value,
      }));
    }

    function writeRender(event_status) {
      if (event_status == "verificated") {
        return (
          <div className="flex h-auto w-full flex-col">
            <textarea
              className="max-h-68 resize-none rounded-lg border-2 border-gray-500 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 lg:text-lg"
              placeholder={
                comment == false
                  ? "Skomentuj wydarzenie..."
                  : `Odpowiedz "${comment.author}" na ${
                      comment.text_comment == null
                        ? "zablokowany komentarz"
                        : `komentarz "${comment.text_comment}"`
                    }`
              }
              onChange={handleChangeTextarea}
              maxLength="500"
              id={id}
            ></textarea>
            <div className="flex h-11 flex-row items-center justify-end space-x-10 pt-3">
              <span
                className={`${
                  textAnswer[id]?.length > 475
                    ? "text-red-500"
                    : "text-gray-500"
                } font-mukta text-xs lg:text-sm`}
              >
                {`${
                  textAnswer[id]?.length !== undefined
                    ? textAnswer[id].length
                    : 0
                } / 500`}
              </span>
              <button
                disabled={
                  textAnswer[id]?.length == undefined ||
                  textAnswer[id].length < 1
                }
                className="h-full rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none lg:text-base"
                onClick={() => {
                  document.getElementById(id).value = "";
                  setAnswerFormOpen((prevState) => ({
                    ...prevState,
                    [id]: false,
                  }));
                  dispatch(
                    comment_event_post(
                      xcsrfToken,
                      slug,
                      uuid,
                      textAnswer[id],
                      id
                    )
                  );
                  setTextAnswer((prevState) => ({
                    ...prevState,
                    [id]: "",
                  }));
                }}
              >
                Wyślij
              </button>
            </div>
          </div>
        );
      } else if (event_status == "rejected") {
        return (
          <div className="max-h-68 flex h-auto w-full resize-none rounded-lg border-2 border-red-500 bg-transparent py-1 px-2 font-mukta font-mukta text-lg focus:ring-0">
            <span className="font-mukta text-sm italic text-gray-300">
              Komentarze zostały zablokowane
            </span>
          </div>
        );
      } else {
        return (
          <div className="max-h-68 flex h-auto w-full resize-none rounded-lg border-2 border-yellow-300 bg-transparent py-1 px-2 font-mukta font-mukta text-lg focus:ring-0">
            <span className="font-mukta text-sm italic text-gray-300">
              Do momentu pomyślnego zweryfikowania wydarzenia, funkcja
              komentowania została wyłączona. Dalej możesz reagować, zgłaszać
              oraz usuwać komentarze.
            </span>
          </div>
        );
      }
    }

    return (
      <div id="napisz komentarz" className="flex h-auto w-full pt-3 lg:pt-5">
        <div className="flex h-auto w-full flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="flex h-auto w-16">
            <Link to={`/user/${user.username}`} className="flex h-16 w-16">
              <img
                src={`${ips_config.BACKEND}${user.image_thumbnail}`}
                className="h-16 w-16 rounded-full"
              ></img>
            </Link>
          </div>

          {writeRender(event_status)}
        </div>
      </div>
    );
  }

  function moduleCommentsRender(
    comments,
    xcsrfToken,
    slug,
    uuid,
    author_post,
    event_status
  ) {
    return (
      <>
        {openReport.status && modalReport(xcsrfToken, slug, uuid)}
        {openDelete.status && modalDelete(xcsrfToken, slug, uuid)}

        <div className="flex flex-col space-y-1">
          {writeComment(
            slug,
            uuid,
            xcsrfToken,
            false,
            "main_comment",
            event_status
          )}
          <div className="flex h-full w-full flex-col">
            {event_status !== "rejected" &&
              commentRender(
                comments,
                xcsrfToken,
                author_post,
                slug,
                uuid,
                event_status
              )}
          </div>
        </div>
      </>
    );
  }

  return [moduleCommentsRender];
}

export default useEventComment;
