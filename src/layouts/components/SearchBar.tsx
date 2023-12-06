"use client";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCollapse } from "react-collapsed";
import { IoSearch } from "react-icons/io5";
import { TbZoomCancel } from "react-icons/tb";

const SearchBar = ({
  products,
  searchValue,
}: {
  products?: any;
  searchValue?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    useCollapse();

  useEffect(() => {
    const inputField = document.getElementById(
      "searchInputBar",
    ) as HTMLInputElement;
    if (inputField && searchParams.get("q")) {
      inputField.focus();
    }
  }, [searchParams]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".collapse-bar-class") &&
        !target.closest(".search-button-class") &&
        isExpanded
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isExpanded, setExpanded]);


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setExpanded(false);
    
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams));
  }

  return (
    <div className="flex items-center">
      <button className="search-button-class search-icon mr-4 md:mr-6" {...getToggleProps()}>
        {isExpanded ? <TbZoomCancel size={20} /> : <IoSearch size={20} />}
      </button>
      <section
        className="collapse-bar-class w-full absolute top-[56px] lg:top-[74px] left-0"
        {...getCollapseProps()}
      >
        <div className="container">
          <div className="row">
            <form onSubmit={onSubmit} className="flex justify-center">
              <input
                id="searchInputBar"
                key={searchParams?.get("q")}
                type="text"
                name="search"
                placeholder="Search for products"
                autoComplete="off"
                defaultValue={searchParams?.get("q") || ""}
                className="w-full bg-theme-light px-3 py-2 md:px-6 md:py-4 text-dark placeholder:text-light focus:ring-transparent border-none dark:bg-darkmode-theme-light dark:text-darkmode-light"
              />
              <button className="rounded-none btn btn-sm md:btn-md btn-primary cursor-pointer bg-theme-light dark:bg-darkmode-theme-light border-none text-dark dark:text-darkmode-light">
                <IoSearch size={25} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
