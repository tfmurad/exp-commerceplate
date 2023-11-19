import Pagination from "@/components/Pagination";
import { AddToCart } from "@/components/cart/add-to-cart";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getCollections, getVendors } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import ProductFilters from "@/partials/ProductFilters";
import Link from "next/link";
const { pagination_card } = config.settings;

// ProductViewProps
const ProductCardView = async ({ currentPage, products, searchValue }: any) => {
  const resultsText = products.length > 1 ? "results" : "result";


  return (
    <section>
        <div className="sticky top-28 pb-16">
              <div className="row ">
                {searchValue ? (
                  <p className="mb-4">
                    {products.length === 0
                      ? "There are no products that match "
                      : `Showing ${products.length} ${resultsText} for `}
                    <span className="font-bold">&quot;{searchValue}&quot;</span>
                  </p>
                ) : null}

                {
                  products?.length === 0 &&
                  <div className="mx-auto pt-5 text-center">
                    <ImageFallback
                      className="mx-auto mb-6"
                      src="/images/no-search-found.png"
                      alt="no-search-found"
                      width={211}
                      height={184}
                    />
                    <h1 className="h2 mb-4">No Product Found!</h1>
                    <p>We couldn&apos;t find what you filtered for. Try filtering again.</p>
                  </div>
                }

                {products?.map((product: Product) => {
                  const {
                    id,
                    title,
                    handle,
                    featuredImage,
                    priceRange,
                    variants,
                    compareAtPriceRange,
                  } = product;

                  return (
                    <div
                      key={id}
                      className="text-center col-12 sm:col-6 md:col-4 mb-8 md:mb-14 group relative"
                    >
                      <div className="md:relative overflow-hidden">
                        <ImageFallback
                          src={
                            featuredImage?.url || "/images/product_image404.jpg"
                          }
                          width={312}
                          height={269}
                          alt={featuredImage?.altText || "fallback image"}
                          className="w-[312px] h-[150px] md:h-[269px] object-cover rounded-md border mx-auto"
                        />

                        <AddToCart
                          variants={product.variants}
                          availableForSale={product.availableForSale}
                          handle={handle}
                          stylesClass={
                            "btn btn-primary max-md:btn-sm z-10 absolute bottom-28 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
                          }
                        />
                      </div>
                      <div className="py-2 md:py-4 text-center z-20">
                        <h2 className="font-bold md:font-medium text-base md:text-xl">
                          <Link className="after:absolute after:inset-0" href={`/product/${handle}`}>{title}</Link>
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
                              {compareAtPriceRange?.maxVariantPrice?.currencyCode}
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
    </section>
  );
};

export default ProductCardView;
