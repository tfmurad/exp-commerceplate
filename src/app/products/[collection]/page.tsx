import ProductLayouts from '@/components/product/ProductLayouts';
import { defaultSort, sorting } from '@/lib/constants';
import { getListPage } from '@/lib/contentParser';
import { getCollectionProducts, getCollections, getVendors } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import CallToAction from '@/partials/CallToAction';
import PageHeader from '@/partials/PageHeader';
import ProductCardView from '@/partials/ProductCardView';
import ProductFilters from '@/partials/ProductFilters';
import ProductListView from '@/partials/ProductListView';

const CategoryPage = async ({ params, searchParams }: { params: { page: number; collection: string }; searchParams: { [key: string]: string | string[] | undefined } }) => {
  const callToAction = getListPage("sections/call-to-action.md");
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;

  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const { layout } = searchParams as { [key: string]: string };
  const {products} = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  
  
  const categories = await getCollections();
  const vendors = await getVendors({});
  const tags = [
    ...new Set(products.flatMap((product: Product) => product.tags)),
  ];

  // const tags = [
  //   ...new Set(
  //     (
  //       productsData as { pageInfo: PageInfo; products: Product[] }
  //     )?.products.flatMap((product: Product) => product.tags),
  //   ),
  // ];

  // Getting Max price for the price-rage selector
  const maxProductPriceData = products.map(
    (product: Product) => product.priceRange.maxVariantPrice,
  );
  const maxProductPrice = Math.ceil(
    Math.max(
      ...maxProductPriceData.map(
        (a: { amount: string; currencyCode: string }) => parseFloat(a.amount),
      ),
    ),
  );
  const maxProductCurrency: string = products.map(
    (product: Product) => product.priceRange.maxVariantPrice.currencyCode,
  )[0];
  const maxPriceData = { maxProductPrice, maxProductCurrency };
  return (
    <>
      <PageHeader title={"Products"} />
      <ProductLayouts />
      {/* {
        layout === "list" ? <ProductListView currentPage={currentPage} products={products} searchValue={searchValue} /> : <ProductCardView currentPage={currentPage} products={products} searchValue={searchValue} />
      } */}

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
                products={products}
                searchValue={searchValue}
              />
            ) : (
              <ProductCardView
                currentPage={null}
                products={products }
                searchValue={searchValue}
              />
            )}
          </div>
        </div>
      </div>
      <CallToAction data={callToAction} />
    </>
  )
}

export default CategoryPage;