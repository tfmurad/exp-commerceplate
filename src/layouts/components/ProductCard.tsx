"use client";
import ImageFallback from "@/helpers/ImageFallback";
import useLoadMore from "@/hooks/useLoadMore";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import { PageInfo, Product } from "@/lib/shopify/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AddToCart } from "./cart/add-to-cart";

const ProductCard = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // const {
  // 	id,
  // 	title,
  // 	handle,
  // 	featuredImage,
  // 	priceRange,
  // 	variants,
  // 	compareAtPriceRange,
  // } = product;

  const [isLoainding, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const targetElementRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{
    products: Product[];
    pageInfo: PageInfo;
  }>({
    products: [],
    pageInfo: { endCursor: "", hasNextPage: false, hasPreviousPage: false },
  });

  const { filter, q, cursor } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === filter) || defaultSort;

  useEffect(() => {
    setIsLoading(true);
    getProducts({
      sortKey,
      reverse,
      query: q,
      cursor,
    }).then((res) => {
      setIsLoading(false);
      setData({
        products: res.products,
        pageInfo: res.pageInfo,
      });
    });
  }, [cursor, sortKey, q, reverse]);

  const { products, pageInfo } = data;
  const { endCursor, hasNextPage } = pageInfo;

  useLoadMore(targetElementRef, () => {
    if (hasNextPage && !isLoainding) {
      setIsLoading(true);
      getProducts({
        sortKey,
        reverse,
        query: q,
        cursor: endCursor,
      }).then((res) => {
        setIsLoading(false);
        setData({
          products: [...products, ...res.products],
          pageInfo: res.pageInfo,
        });
      });
    }
  });
  return (
    <div ref={targetElementRef} className="relative row">
      {products.map((product, index) => (
        <div key={index} className="text-center col-12 sm:col-6 md:col-4 mb-8 md:mb-14 group">
          <div className="md:relative overflow-hidden">
              <ImageFallback
                src={
                  product.featuredImage?.url || "/images/product_image404.jpg"
                }
                width={312}
                height={269}
                alt={product.featuredImage?.altText || "fallback image"}
                className="w-[312px] h-[150px] md:h-[269px] object-cover rounded-md border mx-auto"
              />

              <AddToCart
                variants={product.variants}
                availableForSale={product.availableForSale}
                handle={product.handle}
                stylesClass={
                  "btn btn-primary max-md:btn-sm z-10 absolute bottom-28 md:bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full md:group-hover:-translate-y-6 duration-300 ease-in-out whitespace-nowrap drop-shadow-md"
                }
              />
            </div>
            <div className="py-2 md:py-4 text-center z-20">
              <h2 className="font-bold md:font-medium text-base md:text-xl">
                <Link
                  className="after:absolute after:inset-0"
                  href={`/product/${product.handle}`}
                >
                  {product.title}
                </Link>
              </h2>
              <div className="flex justify-center items-center gap-x-2 mt-2">
                <span className="text-light dark:text-darkmode-light text-xs md:text-lg font-bold">
                  ৳ {product.priceRange.minVariantPrice.amount}{" "}
                  {product.priceRange.minVariantPrice.currencyCode}
                </span>
                {parseFloat(
                  product.compareAtPriceRange?.maxVariantPrice.amount,
                ) > 0 ? (
                  <s className="text-light dark:text-darkmode-light text-xs md:text-base font-medium">
                    ৳ {product.compareAtPriceRange?.maxVariantPrice.amount}{" "}
                    {product.compareAtPriceRange?.maxVariantPrice?.currencyCode}
                  </s>
                ) : (
                  ""
                )}
              </div>
            </div>
        </div>
      ))}

      <p
        className={
          hasNextPage || isLoainding
            ? "text-center mt-5 opacity-100"
            : "opacity-0"
        }
      >
        Loading...
      </p>
    </div>
  );
};

export default ProductCard;
