import React, { useEffect } from "react";
import HomePage from "../../components/HomePage";

function FirstVisitor() {
  let details_visit_page = [
    [
      "Bądź na bieżąco co się dzieje w",
      "twoim mieście.",
      "text-black",
      "text-red-900 font-outline-red-0001",
      "md:justify-center",
    ],
    [
      "Umawiaj się ze znajomymi na",
      "wydarzenia.",
      "text-red-900 font-outline-red-0001",
      "text-black",
      "md:justify-end",
    ],
    [
      "Zorganizuj swoją serię wydarzeń w",
      "całej Polsce.",
      "text-black",
      "text-red-900 font-outline-red-0001",
      "md:justify-start",
    ],
    [
      "Zbieraj odznaki z wydarzeń i przypisuj je do",
      "swojego profilu.",
      "text-red-900 font-outline-red-0001",
      "text-black",
      "md:justify-end",
    ],
    [
      "Szybko znajdź wydarzenia blisko Ciebie dzięki",
      "geolokalizacji.",
      "text-black",
      "text-red-900 font-outline-red-0001",
      "md:justify-start",
    ],
    [
      "Sprawdź w łatwy sposób, kto ze znajomych wziął udział w",
      "wydarzeniu.",
      "text-black",
      "text-red-900 font-outline-red-0001",
      "md:justify-end",
    ],
  ];

  useEffect(() => {
    const animate = function (e) {
      const div = this.querySelector("div");
      const { offsetX: x, offsetY: y } = e,
        { offsetWidth: width, offsetHeight: height } = this,
        move = 5,
        xMove = (x / width) * (move * 2) - move,
        yMove = (y / height) * (move * 2) - move;

      div.style.transform = `translate(${xMove}px, ${yMove}px)`;

      if (e.type === "mouseleave") div.style.transform = "";
    };

    let elements = document.querySelectorAll("div > .movable");
    elements.forEach((element) =>
      element.addEventListener("mousemove", animate)
    );
    elements.forEach((element) =>
      element.addEventListener("mouseleave", animate)
    );
  }, []);

  return (
    <HomePage>
      <div className="flex h-4/5 w-4/5 flex-col justify-between   px-2 ">
        {details_visit_page.map((information, index) => (
          <div
            className={`flex w-full justify-center ${information[4]}  movable  `}
            key={index}
          >
            <div
              className={`  flex w-auto flex-row  items-center space-x-2  transition duration-100 ease-linear`}
            >
              <div className="flex h-[20px]  w-[20px] flex-shrink-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800  to-gray-800 sm:h-[24px] sm:w-[24px] md:h-[28px] md:w-[28px] lg:h-[33px] lg:w-[33px]  xl:h-[40px] xl:w-[40px] "></div>
              <p
                className={`${information[2]} text-center font-mukta font-black sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}
              >
                {information[0]}
                <span
                  className={`${information[3]} hyphens-manual-sm pl-2 font-bold  sm:text-lg md:text-xl lg:text-2xl xl:text-3xl`}
                >
                  {information[1]}
                </span>
              </p>
            </div>
          </div>
        ))}

        <div className="flex w-full flex-col items-center justify-center space-x-2 pt-4 sm:flex-row sm:items-end md:justify-center">
          <p className="text-md  font-mukta font-bold text-black sm:text-lg md:text-2xl ">
            i wiele więcej w
          </p>
          <span className="hyphens-manual pl-3 pb-1 text-4xl font-bold text-red-900 ">
            EventsAPP
          </span>
        </div>
      </div>
    </HomePage>
  );
}

export default FirstVisitor;
