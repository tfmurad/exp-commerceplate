import Pagination from "@/components/Pagination";
import { AddToCart } from "@/components/cart/add-to-cart";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import { currencySymbol } from "@/lib/constants";
import { getCollections, getVendors } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import ProductFilters from "@/partials/ProductFilters";
import Link from "next/link";
const { pagination_list } = config.settings;

const ProductListView = async ({ currentPage, products, searchValue }: any) => {

  const resultsText = products.length > 1 ? "results" : "result";

  // const totalPages = Math.ceil(products.length / pagination_list);
  // const currentProducts = products.slice(0, pagination_list);

  // const indexOfLastPost = currentPage! * pagination_list;
  // const indexOfFirstPost = indexOfLastPost - pagination_list;
  // const paginatedProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  // const productsToDisplay = currentPage ? paginatedProducts : currentProducts;

  // getting collections 
  const categories = await getCollections();
  const vendors = await getVendors({});

  const tags: string[] = [
    ...new Set(products.flatMap((product: Product) => product.tags) as unknown[]),
  ] as string[];

  // Getting Max price for the price-rage selector
  const maxProductPriceData = products.map((product: Product) => product.priceRange.maxVariantPrice);
  const maxProductPrice = Math.ceil(Math.max(...maxProductPriceData.map((a: { amount: string; currencyCode: string }) => parseFloat(a.amount))));
  const maxProductCurrency: string = products.map((product: Product) => product.priceRange.maxVariantPrice.currencyCode)[0];
  const maxPriceData = { maxProductPrice, maxProductCurrency };

  return (
    <section>
     <div className="space-y-10 pb-24 lg:pb-36 xl:pb-24 sticky top-28">

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
  const { id, title, variants, handle, featuredImage, priceRange, description, compareAtPriceRange } = product;
  return (
    <div className="row" key={id}>
      <div className="col-12 md:col-4">
        <ImageFallback
          src={featuredImage?.url || '/images/product_image404.jpg'}
          // fallback={'/images/category-1.png'}
          width={312}
          height={269}
          alt={featuredImage?.altText || 'fallback image'}
          className='w-[312px] h-[150px] md:h-[269px] object-cover border rounded-md'
        />
      </div>

      <div className="col-12 md:col-8 py-3 max-md:pt-4">
        <h2 className="font-bold md:font-normal h4">
          <Link href={`/product/${handle}`}>
            {title}
          </Link>
        </h2>

        <div className="flex items-center gap-x-2 mt-2">
          <span className="text-light dark:text-darkmode-light text-xs md:text-lg font-bold">
            ৳ {priceRange.minVariantPrice.amount}{" "}
            {priceRange.minVariantPrice.currencyCode}
          </span>
          {parseFloat(compareAtPriceRange?.maxVariantPrice.amount) > 0 ? (
            <s className="text-light dark:text-darkmode-light text-xs md:text-base font-medium">
              {currencySymbol} {compareAtPriceRange?.maxVariantPrice.amount}{" "}
              {compareAtPriceRange?.maxVariantPrice?.currencyCode}
            </s>
          ) : (
            ""
          )}
        </div>

        <p className="max-md:text-xs text-light dark:text-darkmode-light my-4 md:mb-8">{description}</p>
        <AddToCart 
        variants={product.variants} 
        availableForSale={product.availableForSale}
        handle={handle}
        stylesClass={"btn btn-outline-primary max-md:btn-sm drop-shadow-md"} />
      </div>
    </div>
  )
})}
</div>
    </section>
  );
};

export default ProductListView;
