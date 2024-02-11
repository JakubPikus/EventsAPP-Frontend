import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import useEditEvent from "../../hooks/useEditEvent";
import {
  ChevronLeftIcon,
  TrashIcon,
  DocumentAddIcon,
  PlusIcon,
  CheckIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import ips_config from "../../ips_config";
import { event_edit } from "../../actions/data";
import { data_cities } from "../../actions/auth";
import moment from "moment";
import "moment/locale/pl";
import { getUser } from "../../selectors";
moment.locale("pl");

function EditEventPage({
  activeEvent,
  valueInput,
  setValueInput,
  categorys,
  provinces,
  cities,
  series,
  xcsrftoken,
  endProvider,
}) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [
    checkForm,
    validated,
    infoRender,
    formErrorStill,
    formErrorDelete,
    validator,
  ] = useEditEvent();

  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);

  function handleSubmit(e) {
    e.preventDefault();
    if (validated) {
      dispatch(event_edit(activeEvent.id, valueInput, xcsrftoken));
    }
  }

  // MODUŁ HARMONOGRAMU

  const hours = Array.from(Array(24).keys());
  const minutes = Array.from(Array(60).keys());

  const [timeTemplate, setTimeTemplate] = useState({
    startHours: "",
    startMinutes: "",
    endHours: "",
    endMinutes: "",
    details: "",
  });

  const handleValueTimeChange = (e) => {
    if (e.target.name == "details") {
      setTimeTemplate({
        ...timeTemplate,
        [e.target.name]: e.target.value,
      });
    } else {
      if (e.target.value == "") {
        setTimeTemplate({
          ...timeTemplate,
          [e.target.name]: e.target.value,
        });
      } else {
        setTimeTemplate({
          ...timeTemplate,
          [e.target.name]: parseInt(e.target.value),
        });
      }
    }
  };

  const handleAddSchedule = () => {
    if (
      timeTemplate.details.length > 2 &&
      timeTemplate.startHours !== "" &&
      timeTemplate.startMinutes !== "" &&
      ((timeTemplate.endHours == "" && timeTemplate.endMinutes == "") ||
        (timeTemplate.endHours !== "" && timeTemplate.endMinutes !== ""))
    ) {
      let textarea = document.getElementById("textareaEditEvent");
      let sortCursor = 0;

      for (let i = 0; i < Object.keys(valueInput.schedule).length; i++) {
        if (
          timeTemplate.startHours > valueInput.schedule[i].startHours ||
          (timeTemplate.startHours == valueInput.schedule[i].startHours &&
            timeTemplate.startMinutes > valueInput.schedule[i].startMinutes)
        ) {
          sortCursor += 1;
        }
      }
      let updatedSchedule = {};

      for (let i = Object.keys(valueInput.schedule).length - 1; i >= 0; i--) {
        if (i >= sortCursor) {
          updatedSchedule[i + 1] = valueInput.schedule[i];
        } else {
          updatedSchedule[i] = valueInput.schedule[i];
        }
      }
      updatedSchedule[sortCursor] = timeTemplate;

      setValueInput((prevState) => ({
        ...prevState,
        schedule: updatedSchedule,
      }));

      setTimeTemplate({
        startHours: "",
        startMinutes: "",
        endHours: "",
        endMinutes: "",
        details: "",
      });
      textarea.value = "";
      formErrorDelete("schedule");
    }
  };

  const handleDeleteSchedule = (number) => {
    let updatedSchedule = { ...valueInput.schedule };
    delete updatedSchedule[number];

    Object.keys(updatedSchedule).forEach((key) => {
      const currentId = parseInt(key, 10);
      if (currentId > number) {
        const newId = currentId - 1;
        updatedSchedule[newId] = updatedSchedule[currentId];
        delete updatedSchedule[currentId];
      }
    });
    if (Object.keys(updatedSchedule).length == 0) {
      formErrorStill("schedule");
    }

    setValueInput((prevState) => ({
      ...prevState,
      schedule: updatedSchedule,
    }));
  };

  useEffect(() => {
    if (endProvider) {
      let endHours = document.getElementById("endHoursEditEventSelect");
      let endMinutes = document.getElementById("endMinutesEditEventSelect");
      let strHours = `<option class="text-black" value="">---</option>`;
      let strMinutes = `<option class="text-black" value="">---</option>`;
      let tempMinutes;
      if (timeTemplate.startHours !== "" && timeTemplate.startMinutes !== "") {
        for (let i = 0; i < 24; i++) {
          strHours += `<option class="text-black" value="${i}" > ${String(
            i
          ).padStart(2, "0")}</option>`;
        }

        if (
          timeTemplate.startMinutes < 55 &&
          timeTemplate.endHours == timeTemplate.startHours
        ) {
          tempMinutes = timeTemplate.startMinutes + 5;
        } else if (
          timeTemplate.startMinutes > 55 &&
          timeTemplate.endHours == timeTemplate.startHours + 1
        ) {
          tempMinutes = timeTemplate.startMinutes - 55;
        } else {
          tempMinutes = 0;
        }
        for (let i = tempMinutes; i < 60; i++) {
          strMinutes += `<option class="text-black" value="${i}" > ${String(
            i
          ).padStart(2, "0")}</option>`;
        }

        setTimeTemplate((prevState) => ({
          ...prevState,
          endHours: "",
          endMinutes: "",
        }));
      }
      endHours.innerHTML = strHours;
      endMinutes.innerHTML = strMinutes;
    }
  }, [timeTemplate.startHours, timeTemplate.startMinutes]);

  useEffect(() => {
    let endMinutes = document.getElementById("endMinutesEditEventSelect");
    let strMinutes = `<option class="text-black" value="">---</option>`;
    let tempMinutes;

    if (timeTemplate.startHours !== "" && timeTemplate.startMinutes !== "") {
      if (
        timeTemplate.startMinutes < 55 &&
        timeTemplate.startHours == timeTemplate.endHours
      ) {
        tempMinutes = timeTemplate.startMinutes + 5;
      } else if (
        timeTemplate.startMinutes > 55 &&
        (timeTemplate.endHours == timeTemplate.startHours + 1 ||
          (timeTemplate.endHours == 0 && timeTemplate.startHours == 23))
      ) {
        tempMinutes = timeTemplate.startMinutes - 55;
      } else {
        tempMinutes = 0;
      }
      for (let i = tempMinutes; i < 60; i++) {
        strMinutes += `<option class="text-black" value="${i}" > ${String(
          i
        ).padStart(2, "0")}</option>`;
      }
      endMinutes.innerHTML = strMinutes;
      setTimeTemplate((prevState) => ({
        ...prevState,
        endMinutes: "",
      }));
    }
  }, [timeTemplate.endHours]);

  function scheduleModule() {
    return (
      <div className="flex w-full flex-col space-y-4 px-4 pb-4">
        <label className="pt-2 font-mukta text-base text-gray-200 md:text-lg">
          Harmonogram
        </label>
        {Object.values(valueInput.schedule).length > 0 && (
          <div className="flex flex-col space-y-3 divide-y-2 divide-blue-400">
            {Object.values(valueInput.schedule).map((schedule, index) => {
              return (
                <div
                  className="flex flex-row justify-between space-x-4 pt-2"
                  key={index}
                >
                  <div className="flex flex-row items-center">
                    <span className="h-auto font-mukta text-sm text-white md:text-base xs:text-xs">{`${String(
                      schedule.startHours
                    ).padStart(2, "0")}:${String(
                      schedule.startMinutes
                    ).padStart(2, "0")}`}</span>
                    {schedule.endHours !== "" && schedule.endMinutes !== "" && (
                      <span className="h-auto pl-1 font-mukta text-sm text-white  md:text-base xs:text-xs">{`- ${String(
                        schedule.endHours
                      ).padStart(2, "0")}:${String(
                        schedule.endMinutes
                      ).padStart(2, "0")}`}</span>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-between space-x-3">
                    <div className={`break-anywhere flex`}>
                      <p className="font-mukta text-sm  text-gray-300 md:text-base xs:text-xs">
                        {schedule.details}
                      </p>
                    </div>

                    <TrashIcon
                      className={` h-8 w-8 shrink-0 cursor-pointer p-1 text-red-400`}
                      onClick={() => handleDeleteSchedule(index)}
                    ></TrashIcon>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex h-auto w-full flex-col items-center space-y-2 sm:flex-row sm:space-y-0">
          <div className="flex flex-row items-center space-x-3">
            <span className="font-mukta text-sm text-gray-200 md:text-base xs:text-xs">
              Od
            </span>
            <select
              id="startHoursEditEventSelect"
              name="startHours"
              onChange={handleValueTimeChange}
              value={timeTemplate.startHours}
              className={`${
                timeTemplate.startHours !== ""
                  ? "border-blue-400"
                  : "border-gray-400"
              } border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 md:text-base xs:text-xs`}
            >
              <option className="text-black" value="">
                ---
              </option>
              {hours.map((hour, index) => {
                return (
                  <option className="text-black" value={hour} key={index}>
                    {String(hour).padStart(2, "0")}
                  </option>
                );
              })}
            </select>
            <span className="font-mukta text-sm text-gray-200 md:text-base xs:text-xs">
              :
            </span>
            <select
              id="startMinutesEditEventSelect"
              name="startMinutes"
              onChange={handleValueTimeChange}
              value={timeTemplate.startMinutes}
              className={`${
                timeTemplate.startMinutes !== ""
                  ? "border-blue-400"
                  : "border-gray-400"
              } border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 md:text-base xs:text-xs`}
            >
              <option className="text-black" value="">
                ---
              </option>
              {minutes.map((minute, index) => {
                return (
                  <option className="text-black" value={minute} key={index}>
                    {String(minute).padStart(2, "0")}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <span className="font-mukta text-sm text-gray-200 md:text-base xs:text-xs">
              *do
            </span>
            <select
              id="endHoursEditEventSelect"
              name="endHours"
              onChange={handleValueTimeChange}
              value={timeTemplate.endHours}
              className={`${
                timeTemplate.endHours !== ""
                  ? "border-blue-400"
                  : "border-gray-400"
              } border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 md:text-base xs:text-xs`}
            >
              <option className="text-black" value="">
                ---
              </option>
            </select>
            <span className="font-mukta text-sm text-gray-200 md:text-base xs:text-xs">
              :
            </span>
            <select
              id="endMinutesEditEventSelect"
              name="endMinutes"
              onChange={handleValueTimeChange}
              value={timeTemplate.endMinutes}
              className={`${
                timeTemplate.endMinutes !== ""
                  ? "border-blue-400"
                  : "border-gray-400"
              } border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 md:text-base xs:text-xs`}
            >
              <option className="text-black" value="">
                ---
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <textarea
            name="details"
            id="textareaEditEvent"
            className="h-24 w-full resize-none rounded-md border-2 border-blue-400 bg-transparent pr-12 font-mukta font-mukta text-sm text-white focus:ring-0 md:text-base"
            placeholder={`Opisz atrakcje.`}
            onChange={handleValueTimeChange}
            maxLength="100"
          ></textarea>
          <PlusIcon
            className={`${
              timeTemplate.details.length > 2 &&
              timeTemplate.startHours !== "" &&
              timeTemplate.startMinutes !== "" &&
              ((timeTemplate.endHours == "" && timeTemplate.endMinutes == "") ||
                (timeTemplate.endHours !== "" &&
                  timeTemplate.endMinutes !== ""))
                ? "cursor-pointer text-green-400"
                : "text-gray-400"
            } h-11 w-11 p-1`}
            onClick={handleAddSchedule}
          ></PlusIcon>
        </div>
        <div className="flex flex-row">
          <span className="h-auto w-2/3 font-mukta text-sm text-gray-300">
            Opis musi zawierać przynajmniej 3 znaki.
          </span>
          <span
            className={`${
              timeTemplate.details.length < 3 ||
              timeTemplate.details.length > 75
                ? "text-red-500"
                : "text-gray-500"
            } font-mukta text-sm`}
          >
            {`${timeTemplate.details.length} / 100`}
          </span>
        </div>

        <span className="h-auto w-auto pb-1 font-mukta text-xs text-gray-500">
          *godzina zakończenia nie jest wymagana
        </span>
      </div>
    );
  }

  // DO POBRANIA NOWYCH MIAST PRZY ZMIANIE WOJEWODZTWA

  useEffect(() => {
    if (endProvider) {
      formErrorStill("city");
      const { city, ...rest } = valueInput;
      setValueInput(rest);
      let province_filtred = provinces.filter(
        (province) => province.name == valueInput.province
      );
      dispatch(data_cities(xcsrftoken, province_filtred[0].id));
    }
  }, [valueInput.province]);

  // HANDLERY DO ZMIANY VALUEINPUT

  const handleValueChange = (e) => {
    validator(e.target.name, e.target.value);
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleValueDatepickerChange = (newValue) => {
    validator(Object.keys(newValue)[0], Object.values(newValue)[0]);
    setValueInput({ ...valueInput, ...newValue });
  };

  // MODUŁ ZDJĘĆ
  const [dragTarget, setDragTarget] = useState(null);
  const numbersOfImages = Array.from(Array(8).keys());

  const handleAddImage = (e) => {
    const { files } = e.target;
    if (
      files &&
      Object.keys(valueInput.images).length < 8 &&
      files[0].type.startsWith("image/")
    ) {
      let name =
        valueInput?.images && Object.keys(valueInput.images).length > 0
          ? Math.max(...Object.keys(valueInput.images)) + 1
          : 0;

      setValueInput((prevState) => ({
        ...prevState,
        images: {
          ...prevState.images,
          [name]: files[0],
        },
      }));
      formErrorDelete("image");
    }
  };

  const handleDeleteImage = (number) => {
    const updatedImages = { ...valueInput.images };
    delete updatedImages[number];
    Object.keys(updatedImages).forEach((key) => {
      const currentId = parseInt(key, 10);
      if (currentId > number) {
        const newId = currentId - 1;
        updatedImages[newId] = updatedImages[currentId];
        delete updatedImages[currentId];
      }
    });
    if (Object.keys(updatedImages).length == 0) {
      formErrorStill("image");
    }

    setValueInput((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleDropImage = (e) => {
    let newOrderImages = { ...valueInput.images };
    let tempDragImage = newOrderImages[dragTarget];
    newOrderImages[dragTarget] = newOrderImages[e.currentTarget.id];
    newOrderImages[e.currentTarget.id] = tempDragImage;
    setValueInput((prevState) => ({
      ...prevState,
      images: newOrderImages,
    }));
    setDragTarget(null);
  };

  function imagesRender(number) {
    if (valueInput?.images[number] !== undefined) {
      let image;
      if (valueInput.images[number]?.type !== undefined) {
        image = URL.createObjectURL(valueInput.images[number]);
      } else {
        image = `${ips_config.BACKEND}/media/${valueInput.images[number].image}`;
      }

      return (
        <div
          className="group relative flex shrink-0"
          id={number}
          draggable
          onDragOver={(e) => e.preventDefault()}
          onDragStart={(e) => {
            setDragTarget(e.currentTarget.id);
          }}
          onDrop={(e) => {
            handleDropImage(e);
          }}
        >
          {number == 0 && (
            <div className="absolute z-30 h-6 rounded-lg bg-blue-400">
              <span className="h-auto px-2 font-mukta text-sm text-black">
                Główne
              </span>
            </div>
          )}
          <div
            className="absolute z-20 mt-[68px] ml-[68px] cursor-pointer rounded-full border-2 border-red-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            onClick={() => {
              handleDeleteImage(number);
            }}
          >
            <TrashIcon className={` h-10 w-10 p-1 text-red-400`}></TrashIcon>
          </div>

          <img
            src={image}
            className="h-44 w-44 rounded-lg border-2 border-dashed border-blue-400 object-cover transition-opacity duration-150 ease-in-out group-hover:opacity-50"
          ></img>
        </div>
      );
    } else {
      return (
        <div className="group flex h-44 w-44 items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-gray-600">
          <DocumentAddIcon
            className={`h-8 w-8 text-gray-300 transition ease-in-out group-hover:scale-125`}
          ></DocumentAddIcon>
        </div>
      );
    }
  }

  function imagesUploadModule() {
    return numbersOfImages.map((number) => {
      return (
        <div
          className={`${
            !valueInput.images.hasOwnProperty(number) && "cursor-pointer"
          } flex h-44 w-44`}
          key={number}
          onClick={() => {
            if (!valueInput.images.hasOwnProperty(number)) {
              document.querySelector(".inputPhoto").click();
            }
          }}
        >
          <input
            type="file"
            className="inputPhoto"
            accept="image/*"
            onChange={(e) => {
              handleAddImage(e);
            }}
            hidden
          />
          {imagesRender(number)}
        </div>
      );
    });
  }

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-8`}
      >
        {endProvider ? (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="flex h-full w-full flex-col space-y-10 pt-16"
          >
            <div className="flex flex-col justify-center space-y-4 px-2 sm:justify-between    lg:px-8">
              <div className="flex flex-col items-center justify-start space-y-2 md:flex-row md:justify-start md:space-y-0 md:space-x-8">
                <div className="item-starts flex w-full justify-start md:w-auto">
                  <div
                    className="-mt-1 flex w-auto cursor-pointer flex-row items-start md:-mt-0 md:w-auto"
                    onClick={() => history(-1)}
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
                    <span className="font-mukta text-xs text-white md:text-base">
                      Wróć
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                  <span
                    className="cursor-pointer text-center font-mukta  text-xs text-white  underline underline-offset-1 md:shrink-0 md:text-sm xs:text-[9px]"
                    onClick={() => history("/")}
                  >
                    Strona główna
                  </span>
                  <span className="text-center font-mukta text-xs text-white md:text-sm xs:text-[9px]">
                    /
                  </span>

                  <span
                    className="cursor-pointer text-center  font-mukta text-xs text-white underline underline-offset-1 md:shrink-0 md:text-sm xs:text-[9px]"
                    onClick={() =>
                      history(`/events_list?category=${activeEvent.category}`)
                    }
                  >
                    {activeEvent.category}
                  </span>

                  <span className="text-center font-mukta text-xs text-white md:text-sm xs:text-[9px]">
                    /
                  </span>

                  <span
                    className="cursor-pointer text-center  font-mukta text-xs text-white underline underline-offset-1 md:shrink-0 md:text-sm xs:text-[9px]"
                    onClick={() =>
                      history(`/event/${activeEvent.slug}-${activeEvent.uuid}`)
                    }
                  >
                    {activeEvent.title}
                  </span>

                  <span className="text-center font-mukta text-xs text-white md:text-sm xs:text-[9px]">
                    /
                  </span>

                  <span className="text-center font-mukta text-xs text-gray-400 md:shrink-0 md:text-sm xs:text-[9px]">
                    Edycja wydarzenia
                  </span>
                </div>
              </div>
              <div
                className={`break-anywhere flex w-full flex-row items-center ${
                  user.is_admin == false ? "justify-between" : "justify-end"
                }    space-y-0 px-6 pt-2 sm:space-x-8 md:px-12 md:pt-0 xs:flex-col-reverse xs:justify-center xs:space-y-3 xs:px-4`}
              >
                {user.is_admin == false && (
                  <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-2 xs:pt-3">
                    <ExclamationIcon className="h-16 w-16 shrink-0 text-yellow-300" />
                    <span className="text-center font-mukta text-sm text-white md:text-start">
                      Pamiętaj, że każda edycja wydarzenia spowoduje rozpoczęcie
                      weryfikacji. Do czasu pozytywnego rozpatrzenia, dane
                      wydarzenie będzie widoczne tylko przez organizatora i
                      administratorów.
                    </span>
                  </div>
                )}

                <button
                  disabled={!validated}
                  type="submit"
                  value="Submit"
                  className={`h-auto w-auto shrink-0 rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-2 px-6 text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none lg:text-sm xs:w-full`}
                >
                  Zapisz zmiany
                </button>
              </div>
            </div>
            {/* //// */}
            <div className="flex h-full w-full flex-col items-start justify-center px-3 sm:px-5 md:px-10 lg:px-20">
              {infoRender(
                activeEvent.verificated,
                activeEvent.verificated_details
              )}
              <div
                className={`flex h-full w-full flex-col-reverse items-start ${
                  activeEvent.verificated !== "verificated" && "pt-8"
                }  2xl:flex-row 2xl:justify-between 2xl:space-y-0 2xl:space-x-8`}
              >
                {/* LEWA STRONA */}

                {/* ${
                    activeEvent.verificated !== "verificated" && "pt-6"
                  }  */}
                <div
                  id="left_side"
                  className={`flex h-full w-full flex-col space-y-20 pt-7 2xl:w-7/10 2xl:pt-0`}
                >
                  <div
                    id="content"
                    className={`flex flex-col items-center space-y-8 rounded-md border-2 border-blue-400 bg-transparent pb-24`}
                  >
                    <div className="flex w-full flex-col  px-5 pt-6  md:px-10">
                      <span className="h-auto px-4 text-center font-mukta text-sm text-gray-300 sm:px-0">
                        Pierwsze zdjęcie zostanie przypisane jako zdjęcie
                        główne. Przeciągnij zdjęcia według swojej preferowanej
                        kolejności wyświetlania.
                      </span>
                      <div className="flex h-auto w-full flex-wrap justify-center gap-10 pt-8 pb-2">
                        {imagesUploadModule()}
                      </div>
                      {checkForm("image")}
                    </div>

                    <div
                      id="detail"
                      className="flex h-auto w-full flex-col space-y-2"
                    >
                      {/* ////// */}
                      <div className="flex w-full flex-col space-y-2 px-5 md:flex-row md:space-y-0 md:space-x-9 md:px-10">
                        <div className="flex w-full flex-col space-y-1 md:w-2/3">
                          <label className="font-mukta text-base text-gray-200 xl:text-lg">
                            Nazwa wydarzenia
                          </label>
                          <input
                            type="text"
                            name="title"
                            defaultValue={valueInput.title}
                            onChange={handleValueChange}
                            placeholder="Podaj nazwę wydarzenia"
                            className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base"
                          ></input>
                          {checkForm("title")}
                        </div>
                        <div className="flex w-full flex-col space-y-1 md:w-1/3">
                          <label className="font-mukta text-base text-gray-200 xl:text-lg">
                            Kategoria
                          </label>
                          <select
                            name="category"
                            id="categoriesEditEventSelect"
                            value={valueInput.category}
                            onChange={handleValueChange}
                            className="w-full rounded-md border-2  border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base"
                          >
                            {categorys.map((category, index) => {
                              return (
                                <option
                                  className="font-mukta text-black"
                                  value={category.type}
                                  key={index}
                                >
                                  {category.type}
                                </option>
                              );
                            })}
                          </select>
                          <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
                        </div>
                      </div>

                      <div className="flex w-full flex-col space-y-2 px-5 md:flex-row md:space-y-0 md:space-x-10 md:px-10">
                        <div className="flex w-full flex-col space-y-1 md:w-1/3">
                          <label className="font-mukta text-base text-gray-200 xl:text-lg">
                            Data wydarzenia
                          </label>
                          <Datepicker
                            asSingle={true}
                            value={valueInput}
                            minDate={yesterdayDate}
                            displayFormat={"DD.MM.YYYY"}
                            placeholder={"Brak"}
                            onChange={handleValueDatepickerChange}
                            inputClassName="rounded-md w-full text-sm xl:text-base border-2 border-blue-400 bg-transparent text-white font-mukta placeholder-white"
                          />
                          {checkForm("startDate")}
                        </div>

                        <div className="flex w-full flex-col space-y-1 md:w-1/3">
                          <label className="font-mukta text-base text-gray-200 xl:text-lg">
                            Województwo
                          </label>
                          <select
                            name="province"
                            id="provincesEditEventSelect"
                            onChange={handleValueChange}
                            value={valueInput.province}
                            className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base"
                          >
                            {provinces.map((province) => {
                              return (
                                <option
                                  className="font-mukta text-black"
                                  value={province.name}
                                  key={province.id}
                                >
                                  {province.name}
                                </option>
                              );
                            })}
                          </select>
                          <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
                        </div>

                        <div className="flex w-full flex-col space-y-1 md:w-1/3">
                          <label className="font-mukta text-base text-gray-200 xl:text-lg">
                            Miasto
                          </label>
                          <select
                            name="city"
                            id="citiesEditEventSelect"
                            onChange={handleValueChange}
                            value={valueInput.city}
                            className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base"
                          >
                            <option className="text-black" value="Brak">
                              Brak
                            </option>
                            {cities.map((city) => {
                              return (
                                <option
                                  className="font-mukta text-black"
                                  value={city.name}
                                  key={city.id}
                                >
                                  {city.name}
                                </option>
                              );
                            })}
                          </select>
                          {checkForm("city")}
                        </div>
                      </div>
                      <div className="flex flex-row items-center space-x-20 px-5 pt-2 md:px-10 md:pt-8">
                        <div className="flex flex-col space-y-1">
                          <label className="font-mukta text-base text-gray-200 xl:text-lg">
                            Seria wydarzeń (opcjonalnie*)
                          </label>
                          <div className="flex flex-col items-start space-y-2 md:flex-row md:space-y-0 md:space-x-3">
                            <select
                              name="series"
                              id="seriesEditEventSelect"
                              onChange={handleValueChange}
                              value={valueInput.series}
                              className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 md:w-1/3 xl:text-base"
                            >
                              <option
                                className="font-mukta text-black"
                                value=""
                              >
                                Brak
                              </option>
                              {series?.map((serie) => {
                                return (
                                  <option
                                    className="font-mukta text-black"
                                    value={serie.name}
                                    key={serie.id}
                                  >
                                    {serie.name}
                                  </option>
                                );
                              })}
                            </select>

                            <span className="h-auto w-full font-mukta text-sm text-gray-300 md:w-2/3 xl:text-sm">
                              * Jeżeli tworzysz serię wydarzeń, jak 3-rundowy
                              turniej w szachy w różnych miastach, możesz je
                              połączyć ze sobą dla łatwiejszej nawigacji! Aby
                              dodać nową serię, przejdź w "Twoje serie wydarzeń"
                              z paska menu.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="description"
                      className="flex h-auto w-full flex-col space-y-1 px-5 md:px-10"
                    >
                      <span className="font-mukta text-base text-gray-200 xl:text-lg">
                        Opis
                      </span>

                      <div className="flex flex-col space-y-1">
                        <div className="break-anywhere flex w-full text-justify">
                          <textarea
                            name="text"
                            className="h-96 w-full resize-none rounded-md border-2 border-blue-400 bg-transparent font-mukta font-mukta text-base text-white focus:ring-0 xl:text-lg"
                            placeholder={`Opisz wydarzenie.`}
                            maxLength="1500"
                            defaultValue={valueInput.text}
                            onChange={handleValueChange}
                          ></textarea>
                        </div>
                        <div className="flex flex-row justify-between">
                          {checkForm("text")}
                          <span
                            className={`${
                              valueInput.text.length < 50 ||
                              valueInput.text.length > 1475
                                ? "text-red-500"
                                : "text-gray-500"
                            } font-mukta text-sm`}
                          >
                            {`${valueInput.text.length} / 1500`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* PRAWA STRONA */}
                <div
                  id="right_side"
                  className="flex h-auto w-full flex-col space-y-12  2xl:w-1/3 2xl:space-y-0"
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex h-auto rounded-md border-2 border-blue-400 bg-transparent font-mukta text-lg text-gray-100 focus:ring-0">
                      {scheduleModule()}
                    </div>
                    {checkForm("schedule")}
                  </div>
                </div>
              </div>
            </div>
          </form>
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

export default EditEventPage;
