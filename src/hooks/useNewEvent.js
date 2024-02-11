import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckIcon,
  DocumentAddIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import {
  getXCSRFToken,
  getProvinces,
  getCities,
  getCategorys,
  getHandlerData,
  getNewEvent,
} from "../selectors";
import { useNavigate, Navigate } from "react-router-dom";
import { event_create } from "../actions/data";

function useNewEvent() {
  const provinces = useSelector(getProvinces);
  const cities = useSelector(getCities);
  const categorys = useSelector(getCategorys);
  const xcsrftoken = useSelector(getXCSRFToken);
  const handler_data = useSelector(getHandlerData);
  const new_event = useSelector(getNewEvent);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (handler_data.code == "1210" || handler_data.code == "1211") {
      history(`/event/${new_event.slug}-${new_event.uuid}`);
    }
  }, [handler_data]);

  // VALIDACJA

  const formErrorInitial = {
    title:
      "Skonstruuj tytuł tak, aby trafił do jak największej ilości osób. Nie pisz capslockiem.",
    category: "Wybierz z dostępnych kategorii.",
    startDate:
      "Ustaw datę wydarzenia. Pamiętaj, że nie możesz ustawić daty, która była w przeszłości.",
    schedule:
      "Ustal harmonogram wydarzenia lub dodaj chociaż jego godzinę rozpoczęcia. Pamiętaj o podaniu poprawnych godzin zakończenia.",
    province: "Wybierz województwo.",
    city: "Wybierz miasto znajdujące się w podanym województwie.",
    image:
      "Ustaw chociaż jedno zdjęcie do wydarzenia. Pamiętaj, aby przesłane pliki były obrazkiem.",
    text: "Opis musi posiadać chociaż 50 znaków.",
  };
  const [formError, setFormError] = useState(formErrorInitial);
  const [validated, setValidated] = useState(false);

  function formErrorStill(name) {
    setFormError({
      ...formError,
      [name]: formErrorInitial[name],
    });
  }

  function formErrorDelete(name) {
    let copiedFormError = { ...formError };
    delete copiedFormError[name];
    setFormError(() => ({ ...copiedFormError }));
  }

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [formError]);

  function checkProvince(temp) {
    for (var key in provinces) {
      if (provinces[key].name == temp) {
        return true;
      }
    }
    return false;
  }

  function checkCity(temp) {
    for (var key in cities) {
      if (cities[key].name == temp) {
        return true;
      }
    }
    return false;
  }

  function checkCategory(temp) {
    for (var key in categorys) {
      if (categorys[key].type == temp) {
        return true;
      }
    }
    return false;
  }

  function validator(name, value) {
    switch (name) {
      case "title":
        if (value.length > 5) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "category":
        if (checkCategory(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "startDate":
        if (value !== null) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "province":
        if (checkProvince(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "city":
        if (checkCity(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "text":
        if (value.length >= 50) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;
      default:
        break;
    }
  }

  function checkForm(value) {
    {
      return formError[value] ? (
        <span className="h-auto w-2/3 pb-1 font-mukta text-sm text-gray-300">
          {formError[value]}
        </span>
      ) : (
        <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
      );
    }
  }

  // DZIAŁANIE STRONY

  const [valueInput, setValueInput] = useState({
    title: "",
    images: {},
    category: "",
    schedule: {},
    province: "",
    series: "",
    city: "",
    text: "",
  });

  const hours = Array.from(Array(24).keys());
  const minutes = Array.from(Array(60).keys());

  const handleValueChange = (e) => {
    validator(e.target.name, e.target.value);
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleValueDatepickerChange = (newValue) => {
    validator(Object.keys(newValue)[0], Object.values(newValue)[0]);
    setValueInput({ ...valueInput, ...newValue });
  };

  // MODOUŁ HARMONOGRAMU
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
      let textarea = document.getElementById("textareaNewEvent");
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
    let endHours = document.getElementById("endHoursNewEventSelect");
    let endMinutes = document.getElementById("endMinutesNewEventSelect");
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
  }, [timeTemplate.startHours, timeTemplate.startMinutes]);

  useEffect(() => {
    let endMinutes = document.getElementById("endMinutesNewEventSelect");
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
                      <span className="h-auto pl-1 font-mukta text-sm text-white md:text-base xs:text-xs">{`- ${String(
                        schedule.endHours
                      ).padStart(2, "0")}:${String(
                        schedule.endMinutes
                      ).padStart(2, "0")}`}</span>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-between space-x-3">
                    <div className={`break-anywhere flex `}>
                      <p className="font-mukta text-sm text-gray-300 md:text-base xs:text-xs">
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

        <div className="flex h-auto w-full flex-col items-center space-y-2 sm:space-y-0 md:flex-row">
          <div className="flex flex-row items-center space-x-3">
            <span className="font-mukta text-sm text-gray-200 md:text-base xs:text-xs">
              Od
            </span>
            <select
              id="startHoursNewEventSelect"
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
              id="startMinutesNewEventSelect"
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
              id="endHoursNewEventSelect"
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
              id="endMinutesNewEventSelect"
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
            <span className="font-mukta text-gray-200">)</span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <textarea
            name="details"
            id="textareaNewEvent"
            className="h-24 w-full resize-none rounded-md border-2 border-blue-400 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 md:text-base xs:text-xs"
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
        <div className="flex w-full flex-row justify-between space-x-6 pr-14">
          <span className="h-auto pb-1 font-mukta text-sm text-gray-300">
            Opis musi zawierać przynajmniej 3 znaki.
          </span>
          <span
            className={`${
              timeTemplate.details.length < 3 ||
              timeTemplate.details.length > 75
                ? "text-red-500"
                : "text-gray-500"
            } shrink-0 font-mukta text-sm`}
          >
            {`${timeTemplate.details.length} / 100`}
          </span>
        </div>
      </div>
    );
  }

  // MODUŁ DODAWANIA ZDJĘĆ

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
      return (
        <div
          className={`group flex relative`}
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
          <img
            src={URL.createObjectURL(valueInput.images[number])}
            className="h-36 w-36 rounded-lg border-2 border-dashed border-blue-400 object-cover transition-opacity duration-150 ease-in-out group-hover:opacity-50"
          ></img>

          <div
            className="absolute mt-[50px] ml-[50px] cursor-pointer rounded-full border-2 border-red-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            onClick={() => {
              handleDeleteImage(number);
            }}
          >
            <TrashIcon className={` h-10 w-10 p-1 text-red-400`}></TrashIcon>
          </div>
          {number == 0 && (
            <div className="absolute rounded-lg bg-blue-400">
              <span className="h-auto px-2 font-mukta text-sm text-black">
                Główne
              </span>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="group flex h-36 w-36 items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-gray-600">
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
          } flex h-36 w-36`}
          onClick={() => {
            if (!valueInput.images.hasOwnProperty(number)) {
              document.querySelector(".inputPhoto").click();
            }
          }}
          key={number}
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

  function handleSubmit(e) {
    e.preventDefault();
    if (validated) {
      dispatch(event_create(valueInput, xcsrftoken));
    }
  }

  return [
    formErrorStill,
    handleSubmit,
    checkForm,
    validated,
    valueInput,
    setValueInput,
    handleValueChange,
    handleValueDatepickerChange,
    imagesUploadModule,
    scheduleModule,
  ];
}
export default useNewEvent;
