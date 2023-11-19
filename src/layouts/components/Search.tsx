"use client"
import ImageFallback from "@/helpers/ImageFallback";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";

const Search = ({ products, searchValue }: { products: any, searchValue: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <section className="section-sm">
      <div className="container">
        <div className="row">
          <form onSubmit={onSubmit} className="flex justify-center col-9 md:col-7 mx-auto">
            <input
              key={searchParams?.get('q')}
              type="text"
              name="search"
              placeholder="Search for products..."
              autoComplete="off"
              defaultValue={searchParams?.get('q') || ''}
              className="form-input bg-white rounded-r-none py-2"
            />
            <button
              className="btn btn-sm md:btn-md btn-primary rounded-tl-none rounded-bl-none cursor-pointer"
              type="submit"
              value="Subscribe"
            >
              <IoSearch size={25} />
            </button>
          </form>

          {searchValue ? (
            <div className="mb-4 h4">
              {products.length === 0
                ? <div className="mx-auto pt-5 text-center">
                <ImageFallback
                  className="mx-auto mb-6"
                  src="/images/no-search-found.png"
                  alt="no-search-found"
                  width={211}
                  height={184}
                />
                <h1 className="h2 mb-4">No Search Found!</h1>
                <p>There are no products that match <span className="font-bold">&quot;{searchValue}&quot;</span>. Try searching again.</p>
              </div>
                :null}
            </div>
          ) :
            <div className="mx-auto pt-5 text-center">
              <ImageFallback
                className="mx-auto mb-6"
                src="/images/no-search-found.png"
                alt="no-search-found"
                width={211}
                height={184}
              />
              <h1 className="h2 mb-4">Search Products Here</h1>
              <p>Search for products by title, category, or tag.</p>
            </div>
          }
        </div>
      </div>

    </section>
  )
}

export default Search;