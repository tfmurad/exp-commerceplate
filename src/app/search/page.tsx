import Search from "@/components/Search";
import { AddToCart } from "@/components/cart/add-to-cart";
import ImageFallback from "@/helpers/ImageFallback";
import { getProducts } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import SeoMeta from "@/partials/SeoMeta";
import Link from "next/link";
import { Suspense } from "react";

const ShowSearchedProduct = async ({ searchParams }: { searchParams: any }) => {
  const { q: searchValue } = searchParams as { [key: string]: string };

  if (searchValue) {
    const { products } = await getProducts({ query: searchValue });
    const resultsText = products.length > 1 ? "results" : "result";
    return (
      <>
        <Search searchValue={searchValue} products={products} />
        {/* <ProductCardView
          currentPage={null}
          products={products}
          searchValue={searchValue}
        /> */}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 lg:col-9 mx-auto">
                <div className="row">
                  {searchValue ? (
                    <p className="mb-4 h4">
                      {products.length > 0 && (
                        <span>
                          Showing {products.length} {resultsText} for{" "}
                          <span className="font-bold">
                            &quot;{searchValue}&quot;
                          </span>
                        </span>
                      )}
                    </p>
                  ) : null}

                  {products?.map((product: Product) => {
                    const {
                      id,
                      title,
                      handle,
                      featuredImage,
                      priceRange,
                      compareAtPriceRange,
                    } = product;

                    return (
                      <div
                        key={id}
                        className="text-center col-6 md:col-4 mb-8 md:mb-14 group"
                      >
                        <div className="relative overflow-hidden">
                          <ImageFallback
                            src={
                              featuredImage?.url ||
                              "/images/product_image404.jpg"
                            }
                            width={312}
                            height={269}
                            alt={featuredImage?.altText || "fallback image"}
                            className="w-[312px] h-[150px] md:h-[269px] object-cover rounded-md border"
                          />

                          <AddToCart
                            handle={handle}
                            variants={product.variants}
                            availableForSale={product.availableForSale}
                            stylesClass={
                              "btn btn-primary max-md:btn-sm z-10 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
                            }
                          />
                        </div>
                        <div className="py-2 md:py-4 text-center z-20">
                          <h2 className="font-bold md:font-medium text-base md:text-xl">
                            <Link href={`/product/${handle}`}>{title}</Link>
                          </h2>
                          <div className="flex justify-center items-center gap-x-2 mt-2">
                            <span className="text-light dark:text-darkmode-light text-xs md:text-lg font-bold">
                              ৳ {priceRange.minVariantPrice.amount}{" "}
                              {priceRange.minVariantPrice.currencyCode}
                            </span>
                            {parseFloat(
                              compareAtPriceRange?.maxVariantPrice.amount,
                            ) > 0 ? (
                              <s className="text-light dark:text-darkmode-light text-xs md:text-base font-medium">
                                ৳ {compareAtPriceRange?.maxVariantPrice.amount}{" "}
                                {
                                  compareAtPriceRange?.maxVariantPrice
                                    ?.currencyCode
                                }
                              </s>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Search searchValue={searchValue} products={[]} />
      </>
    );
  }
};

const SearchPage = async ({ searchParams }: { searchParams: any }) => {
  return (
    <>
      <SeoMeta title={"Search"} />
      <Suspense
        fallback={
          <section className="pt-14 xl:pt-28">
            <div className="container">
              <div className="row gy-4">
                <div className="col-12 lg:col-9 mx-auto">
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
        <ShowSearchedProduct searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default SearchPage;
