"use client";

import ShowTags from "@/components/product/ShowTags";
import RangeSlider from "@/components/rangeSlider/RangeSlider";
import { ShopifyCollection } from "@/lib/shopify/types";
import { createUrl } from "@/lib/utils";
import { slugify } from "@/lib/utils/textConverter";
import { useRouter, useSearchParams } from "next/navigation";
import { BsCheckLg } from "react-icons/bs";

const ProductFilters = ({
  categories,
  vendors,
  tags,
  maxPriceData,
}: {
  categories: ShopifyCollection[];
  vendors: { vendor: string; productCount: number }[];
  tags: string[];
  maxPriceData: { maxProductPrice: number; maxProductCurrency: string };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedBrands = searchParams.getAll("b");
  const selectedCategory = searchParams.get("c");

  // console.log(vendors)
  // const sizes = [
  //   {
  //     id: "H40E27",
  //     height: 40,
  //     bulbSize: 27,
  //   },
  //   {
  //     id: "H35E14",
  //     height: 35,
  //     bulbSize: 14,
  //   },
  //   {
  //     id: "H150E25",
  //     height: 150,
  //     bulbSize: 25,
  //   },
  // ];

  const handleBrandClick = (name: string) => {
    const slugName = slugify(name.toLowerCase());
    const newParams = new URLSearchParams(searchParams.toString());

    const currentBrands = newParams.getAll("b");

    if (currentBrands.includes(slugName)) {
      newParams.delete("b", slugName);
    } else {
      newParams.append("b", slugName);
    }
    router.push(createUrl("/products", newParams), { scroll: false });
  };

  const handleCategoryClick = (handle: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (handle === selectedCategory) {
      newParams.delete("c");
    } else {
      newParams.set("c", handle);
    }
    router.push(createUrl("/products", newParams), { scroll: false });
  };

  // removing the states for using in the style class
  // const cRemove = searchParams.get('c');
  // const bRemove = searchParams.get('b');
  // useEffect(() => {
  //   if (!cRemove) {
  //     setSelectedCategory(null);
  //   }
  //   if (!bRemove) {
  //     setSelectedBrand(null);
  //   }
  // }, [cRemove, bRemove])

  return (
    <div className="py-4 lg:py-10">
      <div>
        <h5 className="mb-2 lg:text-xl">Select Price Range</h5>
        <hr/>
        <div className="py-4">
        <RangeSlider maxPriceData={maxPriceData} />
        </div>
      </div>

      {/* <div>
        <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Product Categories</h5>
        <hr />
        <ul className="mt-4 space-y-4">
          {categories &&
            categories.map((category) => (
              <CollectionItem
                key={category.handle}
                title={category.title}
                path={category.path || ""}
                productCount={category.products?.edges.length}
              />
            ))}
        </ul>
      </div> */}

      <div>
        <h5 className="mb-2 lg:text-xl">Product Categories</h5>
        <hr />
        <ul className="mt-4 space-y-4">
          {categories.map((category) => (
            <li
              key={category.handle}
              className={`flex items-center justify-between text-light dark:text-darkmode-light cursor-pointer ${
                selectedCategory === category.handle
                  ? "text-dark dark:text-darkmode-light font-semibold"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category.handle)}
            >
              {category.title}{" "}
              <span>
                {category?.products?.edges.length! > 0
                  ? `(${category?.products?.edges.length!})`
                  : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {vendors && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Brands</h5>
          <hr />
          <ul className="mt-4 space-y-4">
            {vendors.map((vendor) => (
              <li
                key={vendor.vendor}
                className={`flex items-center justify-between cursor-pointer text-light dark:text-darkmode-light`}
                onClick={() => handleBrandClick(vendor.vendor)}
              >
                <span>
                  {vendor.vendor} ({vendor.productCount})
                </span>
                <div className="h-4 w-4 rounded-sm flex items-center justify-center border border-light dark:border-darkmode-light">
                  {selectedBrands.map((b, i) =>
                    slugify(vendor.vendor.toLowerCase()) === b ? (
                      <span key={i}>
                        <BsCheckLg size={16} />
                      </span>
                    ) : null,
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* <div>
        <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Frame Color</h5>
        <hr />
        <FrameColor />
      </div>

      <div>
        <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Size</h5>
        <hr />
        <ul className="mt-4 space-y-4">
          {sizes.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between cursor-pointer text-light dark:text-darkmode-light`}
              onClick={() => handleSizeClick(item.id)}
            >
              <span>
                Height {item.height}cm, Bulb E{item.bulbSize}
              </span>
              <div className="h-4 w-4 rounded-sm flex items-center justify-center border border-light dark:border-darkmode-light">
                {selectedSize === item.id && (
                  <span>
                    <BsCheckLg size={16} />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div> */}

      {tags.length > 0 && (
        <div>
          <h5 className="mb-2 mt-8 lg:mt-10 lg:text-xl">Tags</h5>
          <hr />
          {/* <button className="flex flex-wrap gap-3 mt-4">
            {tags.map((tag: string) => (
              <p
                key={tag}
                className="px-2 py-1 rounded-md border text-light dark:text-darkmode-light"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </p>
            ))}
          </button> */}
          <div className="mt-4">
            <ShowTags tags={tags} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
