import React, { useEffect, useState } from "react";
import { CategoriesData } from "../data/CategoriesData";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { getAllMoviesAction } from "../redux/actions/movieActions";
import { useDispatch } from "react-redux";
import { YearData, CountriesData, RatesData } from "../data/FiltersData";

const Filters = (props) => {
  const {
    categories,
    category,
    setCategory,
    year,
    setYear,
    country,
    setCountry,
    rates,
    setRates,
  } = props?.data;

  const dispatch = useDispatch();

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? [{ name: "All Categories" }, ...categories]
          : [{ name: "No category found" }],
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: country,
      onChange: setCountry,
      items: CountriesData,
    },
    {
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
  ];

  useEffect(() => {
    if (
      (category?.name !== "No category found" &&
        category?.name !== "All Categories") ||
      year != YearData[0] ||
      country != CountriesData[0]
      // || rates != RatesData[0]
    ) {
      dispatch(
        getAllMoviesAction({
          genreId: category?.name === "All Categories" ? "" : category?.id,
          producingCountry:
            country?.name === CountriesData[0].name ? "" : country?.name,
          yearOfRelease:
            year?.name === YearData[0].name ? "" : year?.name.slice(0, 4),
        })
      );
    }
  }, [dispatch, category, country, year]);
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
            {filter.value.name}
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
                  {item.name}
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
