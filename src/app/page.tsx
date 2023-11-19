/* eslint-disable react/no-unescaped-entities */
import CategoriesSlider from "@/components/CategoriesSlider";
import HeroSlider from "@/components/HeroSlider";
import { getListPage } from "@/lib/contentParser";
import { getCollectionProducts, getCollections } from "@/lib/shopify";
import CallToAction from "@/partials/CallToAction";
import LatestProducts from "@/partials/LatestProducts";
import SeoMeta from "@/partials/SeoMeta";
import { Suspense } from "react";


const ShowCategories = async () => {
  const categories = await getCollections();
  return <CategoriesSlider categories={categories} />
}

const ShowLatestProducts = async () => {
  const { pageInfo, products } = await getCollectionProducts({ collection: "latest-products", reverse: false });
  return <LatestProducts products={products} />
}

const Home = async () => {
  const callToAction = getListPage("sections/call-to-action.md");
  // const homepage = getListPage("homepage/_index.md");
  // const { frontmatter } = homepage;
  // const { banner }: { banner: Banner[]; } = frontmatter;

  const sliderImages = await getCollectionProducts({ collection: "hidden-homepage-carousel" });
  const { products } = sliderImages;

  return (
    <>
      <SeoMeta />
      <section>
        <div className="container">
          <div className="bg-gradient py-10 rounded-md">
            <HeroSlider products={products} />
          </div>
        </div>
      </section>

      {/* category section  */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2>Categories</h2>
          </div>
          {/* <CategoriesSlider categories={categories} /> */}
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6">
                {Array(3)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div key={index} className="h-[150px] md:h-[250px] lg:h-[306px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                    );
                  })}
              </div>
            }>
            <ShowCategories />
          </Suspense>
        </div>
      </section>

      {/* Latest Products section  */}
      <section>
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="mb-2">Latest Products</h2>
            <p className="md:h5">Don't Miss Today's Latest Deals</p>
          </div>
          {/* <LatestProducts products={latestProducts} /> */}
          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array(8)
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
            }>
            <ShowLatestProducts />
          </Suspense>
        </div>
      </section>

      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;