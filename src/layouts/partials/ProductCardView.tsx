import ProductCard from "@/components/ProductCard";
import ImageFallback from "@/helpers/ImageFallback";

// ProductViewProps
const ProductCardView = async ({
  products,
  searchValue,
  searchParams,
}: any) => {
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

          {products?.length === 0 && (
            <div className="mx-auto pt-5 text-center">
              <ImageFallback
                className="mx-auto mb-6"
                src="/images/no-search-found.png"
                alt="no-search-found"
                width={211}
                height={184}
              />
              <h1 className="h2 mb-4">No Product Found!</h1>
              <p>
                We couldn&apos;t find what you filtered for. Try filtering
                again.
              </p>
            </div>
          )}

          <div>
            <ProductCard searchParams={searchParams} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCardView;
