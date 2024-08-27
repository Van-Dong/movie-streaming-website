import React, { useState } from "react";
import { CategoriesData } from "../data/CategoriesData";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const YearData = [
  { title: "Sort By Year" },
  { title: "1700 - 1800" },
  { title: "1800 - 1900" },
  { title: "1900 - 2000" },
  { title: "2000 - 2010" },
  { title: "2010 - 2030" },
];

const TimesData = [
  { title: "Sort By Hours" },
  { title: "1 - 5 Hours" },
  { title: "5 - 10 Hours" },
  { title: "10 - 15 Hours" },
  { title: "15 - 20 Hours" },
];

const RatesData = [
  { title: "Sort By Rates" },
  { title: "1 Star" },
  { title: "2 Star" },
  { title: "3 Star" },
  { title: "4 Star" },
  { title: "5 Star" },
];

const Filters = () => {
  // category lấy từ backend
  const [category, setCategory] = useState({ title: "category" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items: CategoriesData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: times,
      onChange: setTimes,
      items: TimesData,
    },
    {
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
  ];
  return (
    <div className="my-6 bg-dry border border-gray-800 text-dryGray grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-12 rounded p-6">
      {Filter.map((filter, index) => (
        <Listbox key={index} value={filter.value} onChange={filter.onChange}>
          <ListboxButton
            className={clsx(
              "relative block w-full rounded-lg bg-main py-4 pr-10 pl-6 text-left text-xs text-white border border-gray-800",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            {filter.value.title}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none overflow-auto",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {filter.items.map((item, i) => (
              <ListboxOption
                key={i}
                value={item}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-subMain"
              >
                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible group-data-[selected]:font-bold group-data-[focus]:fill-white" />
                <div className="text-sm text-black group-data-[selected]:font-bold group-data-[focus]:text-white">
                  {item.title}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      ))}
    </div>
  );
};

export default Filters;
