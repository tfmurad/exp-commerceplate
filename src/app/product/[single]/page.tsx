import Social from "@/components/Social";
import { AddToCart } from "@/components/cart/add-to-cart";
import ProductGallery from "@/components/product/ProductGallery";
import ShowTags from "@/components/product/ShowTags";
import { VariantSelector } from "@/components/product/variant-selector";
import social from "@/config/social.json";
import MDXContent from "@/helpers/MDXContent";
import { currencySymbol } from "@/lib/constants";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import LatestProducts from "@/partials/LatestProducts";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// export const runtime = "edge";

export const generateMetadata = async ({
  params,
}: {
  params: { single: string };
}): Promise<Metadata> => {
  const product = await getProduct(params.single);
  if (!product) return notFound();
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  };
};

const ShowProductSingle = async ({ params }: { params: { single: string } }) => {
  const product = await getProduct(params.single);
  if (!product) return notFound();
  const {
    id,
    title,
    description,
    availableForSale,
    priceRange,
    featuredImage,
    compareAtPriceRange,
    images,
    options,
    variants,
    tags,
  } = product;

  const relatedProducts = await getProductRecommendations(id);
  // if (!relatedProducts.length) return null;

  return (
    <>
      <section className="md:section-sm">
        <div className="container">
          <div className="row justify-center">
            {/* right side contents  */}
            <div className="col-10 md:col-8 lg:col-6">
              <ProductGallery images={images} />
            </div>

            {/* left side contents  */}
            <div className="col-10 md:col-8 lg:col-5 md:ml-7 py-6 lg:py-0">
              <h1 className="text-3xl md:h2 mb-2 md:mb-6">{title}</h1>

              <div className="flex gap-2 items-center">
                <h4 className="text-light max-md:h2">
                  {currencySymbol} {priceRange?.minVariantPrice.amount}{" "}
                  {priceRange?.minVariantPrice?.currencyCode}
                </h4>
                {parseFloat(compareAtPriceRange?.maxVariantPrice.amount) > 0 ? (
                  <s className="text-light max-md:h3 dark:text-darkmode-light">
                    {currencySymbol} {compareAtPriceRange?.maxVariantPrice.amount}{" "}
                    {compareAtPriceRange?.maxVariantPrice?.currencyCode}
                  </s>
                ) : (
                  ""
                )}
              </div>

              <div className="my-8 md:my-10 space-y-6 md:space-y-10">
                <div className="-mt-2">
                  {options && <VariantSelector options={options} variants={variants} images={images}/>}
                </div>
              </div>

              <div className="flex gap-4 mt-8 md:mt-10 mb-6">
                <AddToCart variants={product.variants} availableForSale={product.availableForSale} stylesClass={"btn max-md:btn-sm btn-primary"} handle={null} />
              </div>

              <div className="mb-8 md:mb-10">
                <p className="p-2 max-md:text-sm rounded-md bg-theme-light dark:bg-darkmode-theme-light inline">
                  Est. Delivery between 0 - 3 days
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h5 className="max-md:text-base">Payment: </h5>
                {Array.from({ length: 7 }).map((_, i) => (
                  <Image
                    key={i}
                    src={"/images/visa.png"}
                    alt="payment"
                    width={44}
                    height={32}
                  />
                ))}
              </div>

              <hr className="my-6" />

              <div className="flex gap-3 items-center mb-6">
                <h5 className="max-md:text-base">Share:</h5>
                <Social source={social.main} className="social-icons" />
              </div>

              {tags.length > 0 && (
                <div className="flex gap-3 items-center">
                  <h5 className="max-md:text-base">Tags:</h5>
                  <ShowTags tags={tags} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description of a product  */}
      {description && (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-10 lg:col-11 mx-auto border rounded-md p-4">
                <p className="font-semibold">Description:</p>
                <MDXContent content={description} />
              </div>
            </div>
            {/* <p>{description}</p> */}
          </div>
        </section>
      )}

      {/* Recommented Products section  */}
      <section className="section">
        <div className="container">
          {relatedProducts.length > 0 &&
            <>
              <div className="text-center mb-6 md:mb-14">
                <h2 className="mb-2">Related Products</h2>
              </div>
              <LatestProducts products={relatedProducts} />
            </>
          }
        </div>
      </section>

      {/* <section>
      <div className="container text-center">
        <h3 className="mb-14">Related Products</h3>

        <div className="row mb-6">
        <LatestProducts products={relatedProducts}/>
        </div>
      </div>
    </section> */}
    </>
  )
}

const ProductSingle = ({ params }: { params: { single: string } }) => {

  return (
    <Suspense fallback={
      <>
        <section className="md:section-sm">
          <div className="container">
            <div className="row justify-center">
              {/* right side contents  */}
              <div className="col-10 md:col-8 lg:col-6">
                <div className="h-[623px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700 mb-4"></div>
                <div className="grid grid-cols-4 gap-x-4">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <div key={index} className="h-[146px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
                      );
                    })}
                </div>

              </div>

              {/* left side contents  */}
              <div className="col-10 md:col-8 lg:col-5 md:ml-7 py-6 lg:py-0">
                {Array(8)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div key={index} className="h-20 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>

        <section className="pt-14 xl:pt-28">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        </section>
      </>
    }>
      <ShowProductSingle params={params} />
    </Suspense>
  );
};

export default ProductSingle;
