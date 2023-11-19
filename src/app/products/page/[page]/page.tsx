import ProductLayouts from "@/components/product/ProductLayouts";
import config from "@/config/config.json";
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
import ProductListView from "@/partials/ProductListView";
const { pagination_card, pagination_list } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = async () => {
  const { products } = await getProducts({});
  const totalPages = Math.ceil(products.length / pagination_list);
  let paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

function spreadPages(num: number): number[] {
  let pages = [];

  for (let i = 2; i <= num; i++) {
    pages.push(i);
  }

  return pages;
}

const Products = async ({
  params,
  searchParams,
}: {
  params: { page: number };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const callToAction = getListPage("sections/call-to-action.md");
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;

  const {
    sort,
    q: searchValue,
    minPrice,
    maxPrice,
    brand,
    c,
    t: tag,
  } = searchParams as {
    [key: string]: string;
  };
  const { layout } = searchParams as { [key: string]: string };

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let productsData;

  if (searchValue || brand || minPrice || maxPrice || c || tag) {
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
      c && c !== "all"
        ? await getCollectionProducts({ collection: c, sortKey, reverse })
        : await getProducts(query);
  } else {
    // Fetch all products
    productsData = await getProducts({ sortKey, reverse });
    // console.log(productsData.products[2].options)
  }
  // const products = await getProducts({ sortKey, reverse, query: searchValue });
  const categories = await getCollections();
  const vendors = await getVendors({});
  const tags = [
    ...new Set(
      (
        productsData as { pageInfo: PageInfo; products: Product[] }
      )?.products.flatMap((product: Product) => product.tags),
    ),
  ];

  return (
    <>
      <PageHeader title={"Products"} />
      <ProductLayouts
        categories={categories}
        vendors={vendors}
        tags={tags}
        maxPriceData={0}
      />
      {layout === "list" ? (
        <ProductListView
          currentPage={currentPage}
          products={
            (Array.isArray(productsData)
              ? productsData
              : productsData?.products) || []
          }
          searchValue={searchValue}
        />
      ) : (
        <ProductCardView
          currentPage={currentPage}
          products={
            (Array.isArray(productsData)
              ? productsData
              : productsData?.products) || []
          }
          searchValue={searchValue}
        />
      )}
      <CallToAction data={callToAction} />
    </>
  );
};

export default Products;
