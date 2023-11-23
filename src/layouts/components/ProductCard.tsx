"use client";

import ImageFallback from "@/helpers/ImageFallback";
import useLoadMore from "@/hooks/useLoadMore";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts, getCollectionProducts } from "@/lib/shopify";
import { PageInfo, Product } from "@/lib/shopify/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AddToCart } from "./cart/add-to-cart";
import { BiLoaderAlt } from "react-icons/bi";

const ProductCard = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const targetElementRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{
    products: Product[];
    pageInfo: PageInfo;
  }>({
    products: [],
    pageInfo: { endCursor: "", hasNextPage: false, hasPreviousPage: false },
  });

  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    b: brand,
    c: category,
    t: tag,
    cursor,
  } = searchParams as {
    [key: string]: string;
  };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let productsData;

        if (searchValue || brand || minPrice || maxPrice || category || tag || cursor) {
          let queryString = "";

          if (minPrice || maxPrice) {
            queryString += `variants.price:<=${maxPrice} variants.price:>=${minPrice}`;
          }

          if (searchValue) {
            queryString += ` ${searchValue}`;
          }

          if (brand) {
            Array.isArray(brand)
              ? (queryString += `${brand
                  .map((b) => `(vendor:${b})`)
                  .join(" OR ")}`)
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
                  reverse
                })
              : await getProducts({ ...query, cursor });

          console.log("i'm brand from if block");
        } else {
          // Fetch all products
          productsData = await getProducts({ sortKey, reverse, cursor });
          console.log("i'm all pd from else block");
        }

        setData({
          products: productsData.products,
          pageInfo: productsData.pageInfo!,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    cursor,
    sortKey,
    searchValue,
    brand,
    minPrice,
    maxPrice,
    category,
    tag,
    reverse,
  ]);

  const { products, pageInfo } = data;
  const endCursor = pageInfo?.endCursor || "";
  const hasNextPage = pageInfo?.hasNextPage || false;

  useLoadMore(targetElementRef, () => {
    if (hasNextPage && !isLoading) {
      fetchDataWithNewCursor(endCursor);
    }
  });

  const fetchDataWithNewCursor = async (newCursor: string) => {
    setIsLoading(true);

    try {
      const res = await getProducts({
        sortKey,
        reverse,
        query: searchValue,
        cursor: newCursor,
      });

      setData({
        products: [...products, ...res.products],
        pageInfo: res.pageInfo,
      });
			
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(products)

  return (
    <div ref={targetElementRef} className="row">
      {products.map((product, index) => (
        <div
          key={index}
          className="text-center col-12 sm:col-6 md:col-4 mb-8 md:mb-14 group relative"
        >
          <div className="md:relative overflow-hidden">
            <ImageFallback
              src={product.featuredImage?.url || "/images/product_image404.jpg"}
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
              {parseFloat(product.compareAtPriceRange?.maxVariantPrice.amount) >
              0 ? (
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
          hasNextPage || isLoading
            ? "opacity-100 flex justify-center"
            : "opacity-0"
        }
      >
        <BiLoaderAlt className={`animate-spin`} size={30} />
      </p>
    </div>
  );
};

export default ProductCard;
