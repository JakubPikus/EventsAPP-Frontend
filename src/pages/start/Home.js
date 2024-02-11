import React from "react";
import { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import Category from "../../components/Category";
import EventList from "../../components/EventList";
import EventBrowser from "../../components/EventBrowser";

function Home({
  user,
  xcsrftoken,
  checkLocalization,
  provinces,
  cities,
  categorys,
  eventsHomescreen,
  endProvider,
  checkCities,
}) {
  var subb;
  var background;

  function watchScroll(centerElement) {
    centerElement.addEventListener("scroll", () =>
      translateParalax(centerElement)
    );
  }

  function translateParalax(element) {
    subb = document.getElementById("banner_subb");
    background = document.getElementById("banner_background");

    background.style.transform = `translateY(${element.scrollTop / 2.6}px)`;
    subb.style.transform = `translateY(${element.scrollTop / 2.3}px)`;
  }

  useEffect(() => {
    const centerElement = document.getElementById("center");

    watchScroll(centerElement);
    return () => {
      centerElement.removeEventListener("scroll", () =>
        translateParalax(centerElement)
      );
    };
  }, []);

  return (
    <Dashboard>
      <div className="flex flex-col">
        <div>
          <div
            className="relative h-[700px] w-full bg-[url('files/tlo.png')] bg-cover bg-center bg-no-repeat"
            id="banner_background"
          ></div>
          <div
            className="items-left relative -mt-[710px] flex flex flex-col justify-center px-5 pt-12 pb-20 md:p-16"
            id="banner_subb"
          >
            <div className="flex flex-col items-center lg:items-start">
              <p className="block text-center font-mukta  text-xl font-bold sm:hidden md:text-[26px] xl:text-4xl">
                Szukaj wydarzeń. Żyj aktywnie. Poznawaj ludzi o podobnych
                zainteresowaniach.
              </p>

              <p className="hidden font-mukta text-xl font-bold sm:block md:text-[22px] lg:text-[33px]  xl:text-4xl">
                Szukaj wydarzeń. Żyj aktywnie.
              </p>
              <div className="flex flex-row items-center lg:pt-2 xl:pt-0">
                <p className="inline hidden break-words font-mukta text-[19px] font-bold sm:block md:text-[21px] lg:text-[33px]  xl:text-4xl">
                  Poznawaj ludzi o podobnych
                </p>
                <span className="-mt-1 hidden pl-2 text-[19px] font-bold text-red-700 sm:block  md:text-[21px]  lg:-mt-2 lg:text-[33px]  xl:text-4xl">
                  zainteresowaniach.
                </span>
              </div>
              <EventBrowser
                user={user}
                xcsrftoken={xcsrftoken}
                provinces={provinces}
                cities={cities}
                endProvider={endProvider}
                checkCities={checkCities}
              />
            </div>
          </div>
          <div
            className="relative z-20 mt-[20px] w-full bg-[url('files/warstwa.png')] bg-cover bg-top bg-no-repeat"
            style={{ height: "36rem" }}
          ></div>
        </div>

        <div className="z-20 h-auto w-full bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600">
          <div className="flex h-24 w-full items-center justify-center px-3">
            <p className="text-center font-mukta text-3xl font-bold text-neutral-100">
              Wybierz swoją kategorię...
            </p>
          </div>
          <div className="flex h-full w-full flex-wrap items-center justify-center gap-12 px-6 pb-28">
            {categorys &&
              categorys.map((category) => (
                <Category props={category} key={category.type} />
              ))}
          </div>
        </div>

        {/* bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 */}

        <div className="z-20 h-auto w-full bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900">
          <div className="flex h-24 w-full items-center justify-center px-3">
            <p className="text-center font-mukta text-3xl font-bold text-neutral-100">
              ... lub sprawdź istniejące wydarzenia !
            </p>
          </div>
          <div className="flex w-full items-center justify-center pb-12 drop-shadow-2xl">
            <EventList
              user={user}
              xcsrftoken={xcsrftoken}
              checkLocalization={checkLocalization}
              provinces={provinces}
              cities={cities}
              eventsHomescreen={eventsHomescreen}
              endProvider={endProvider}
              checkCities={checkCities}
            />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default Home;
