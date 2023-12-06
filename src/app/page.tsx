/* eslint-disable react/no-unescaped-entities */
import CategoriesSlider from "@/components/CategoriesSlider";
import HeroSlider from "@/components/HeroSlider";
import LoadingCategory from "@/components/loading/LoadingCategory";
import LoadingLatestProducts from "@/components/loading/LoadingLatestProducts";
import { getListPage } from "@/lib/contentParser";
import { getCollectionProducts, getCollections } from "@/lib/shopify";
import CallToAction from "@/partials/CallToAction";
import LatestProducts from "@/partials/LatestProducts";
import SeoMeta from "@/partials/SeoMeta";
import { Suspense } from "react";

const ShowHeroSlider = async () => {
  const sliderImages = await getCollectionProducts({ collection: "hidden-homepage-carousel" });
  const { products } = sliderImages;
  return <HeroSlider products={products} />
}


// const ShowCategories = async () => {
//   const categories = await getCollections();
//   return <CategoriesSlider categories={categories} />
// }

const ShowCategories = async () => {
  const categories = await getCollections();
  return <CategoriesSlider categories={categories} />
}


const ShowLatestProducts = async () => {
  const { pageInfo, products } = await getCollectionProducts({ collection: "latest-products", reverse: false });
  return <LatestProducts products={products} />
}

const Home = () => {
  const callToAction = getListPage("sections/call-to-action.md");

  return (
    <>
      <SeoMeta />
      <section>
        <div className="container">
          <div className="bg-gradient py-10 rounded-md">
            <Suspense>
              <ShowHeroSlider />
            </Suspense>
          </div>
        </div>
      </section>

      {/* category section  */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-6 md:mb-14">
            <h2>Categories</h2>
          </div>
          <Suspense
            fallback={<LoadingCategory />}>
            {/* @ts-ignore */}
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
            fallback={<LoadingLatestProducts />}>
            <ShowLatestProducts />
          </Suspense>
        </div>
      </section>

      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;