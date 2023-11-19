import ProductLayouts from "@/components/product/ProductLayouts";
import { defaultSort, sorting } from "@/lib/constants";
import { getListPage } from "@/lib/contentParser";
import {
  getCollectionProducts,
  getCollections,
  getProducts,
  getVendors,
} from "@/lib/shopify";
import { PageInfo, Product } from "@/lib/shopify/types";
import CallToAction from "@/partials/CallToAction";
import PageHeader from "@/partials/PageHeader";
import ProductCardView from "@/partials/ProductCardView";
import ProductFilters from "@/partials/ProductFilters";
import ProductListView from "@/partials/ProductListView";
import { Suspense } from "react";

interface SearchParams {
  sort?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  b?: string;
  c?: string;
  t?: string;
}

const ShowProducts = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    b: brand,
    c: category,
    t: tag,
  } = searchParams as {
    [key: string]: string;
  };

  const { layout } = searchParams as { [key: string]: string };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let productsData;

  if (searchValue || brand || minPrice || maxPrice || category || tag) {
    let queryString = "";

    if (minPrice || maxPrice) {
      queryString += `variants.price:<=${maxPrice} variants.price:>=${minPrice}`;
    }

    if (searchValue) {
      queryString += ` ${searchValue}`;
    }

    if (brand) {
      Array.isArray(brand)
        ? (queryString += `${brand.map((b) => `(vendor:${b})`).join(" OR ")}`)
        : (queryString += `vendor:"${brand}"`);
    }

    if (tag) {
      queryString += ` ${tag}`;
    }

    const query = {
      sortKey,
      reverse,
      query: queryString,
    };

    productsData =
      category && category !== "all"
        ? await getCollectionProducts({
            collection: category,
            sortKey,
            reverse,
          })
        : await getProducts(query);
  } else {
    // Fetch all products
    productsData = await getProducts({ sortKey, reverse });
  }

  // const products = await getProducts({ sortKey, reverse, query: searchValue });
  const categories = await getCollections();
  const vendors = await getVendors({});
  // const tags = [
  //   ...new Set(productsData?.products.flatMap((product: Product) => product.tags)),
  // ];

  const tags = [
    ...new Set(
      (
        productsData as { pageInfo: PageInfo; products: Product[] }
      )?.products.flatMap((product: Product) => product.tags),
    ),
  ];

  // Getting Max price for the price-rage selector
  const maxProductPriceData = productsData?.products.map(
    (product: Product) => product.priceRange.maxVariantPrice,
  );
  const maxProductPrice = Math.ceil(
    Math.max(
      ...maxProductPriceData.map(
        (a: { amount: string; currencyCode: string }) => parseFloat(a.amount),
      ),
    ),
  );
  const maxProductCurrency: string = productsData?.products.map(
    (product: Product) => product.priceRange.maxVariantPrice.currencyCode,
  )[0];
  const maxPriceData = { maxProductPrice, maxProductCurrency };

  return (
    <>
      <ProductLayouts
        categories={categories}
        vendors={vendors}
        tags={tags}
        maxPriceData={0}
      />

      <div className="container">
        <div className="row">
          <div className="col-3 hidden lg:block">
            <ProductFilters
              categories={categories}
              vendors={vendors}
              tags={tags}
              maxPriceData={maxPriceData}
            />
          </div>

          <div className="col-12 lg:col-9">
            {layout === "list" ? (
              <ProductListView
                currentPage={null}
                products={
                  (Array.isArray(productsData)
                    ? productsData
                    : productsData?.products) || []
                }
                searchValue={searchValue}
              />
            ) : (
              <ProductCardView
                currentPage={null}
                products={
                  (Array.isArray(productsData)
                    ? productsData
                    : productsData?.products) || []
                }
                searchValue={searchValue}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsListPage = ({ searchParams }: { searchParams: any }) => {
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      <PageHeader title={"Products"} />
      <Suspense
        fallback={
          <section className="pt-14 xl:pt-28">
            <div className="container">
              <div className="row gy-4">
                <div className="col-12 lg:col-3">
                  <div className="hidden lg:block h-8 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                  <div className="hidden lg:block h-screen rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                </div>

                <div className="col-12 lg:col-9">
                  <div>
                    <div className="flex justify-between">
                      <div className="h-8 w-2/12 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                      <div className="h-8 w-3/12 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {Array(9)
                        .fill(0)
                        .map((_, index) => {
                          return (
                            <div key={index}>
                              <div className="h-[150px] md:h-[269px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                              <div className="flex flex-col justify-center items-center">
                                <div className="mt-4 w-24 h-3 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
                                <div className="mt-2 w-16 h-2 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      >
        <ShowProducts searchParams={searchParams} />
      </Suspense>

      <CallToAction data={callToAction} />
    </>
  );
};

export default ProductsListPage;
