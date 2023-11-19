'use client';

import { ProductOption, ProductVariant } from '@/lib/shopify/types';
import { createUrl } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BsCheckLg } from 'react-icons/bs';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return (
    <div>
      {options.map((option) => (
        <div className="mb-8" key={option.id}>
          <h5 className="mb-2 max-md:text-base">{option.name}</h5>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();
              const optionSearchParams = new URLSearchParams(searchParams.toString());
              optionSearchParams.set(optionNameLowerCase, value);
              const optionUrl = createUrl(pathname, optionSearchParams);

              const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
                options?.find(
                  (option) => option.name.toLowerCase() === key && option.values.includes(value)
                )
              );
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) => combination[key] === value && combination.availableForSale
                )
              );

              const isActive = searchParams.get(optionNameLowerCase) === value;

              return (
                <button
                  key={value}
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                  className={`flex min-w-[48px] items-center justify-center rounded-md border ${option.name === 'Color' ? 'bg-transparent border-none' : 'bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 px-2 py-1'} text-sm ${isActive && option.name !== 'Color' ? 'cursor-default ring-2 ring-dark dark:ring-darkmode-dark' : ''
                    } ${!isActive && isAvailableForSale && option.name !== 'Color'
                      ? 'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-dark hover:dark:ring-darkmode-dark'
                      : ''
                    } ${!isAvailableForSale
                      ? 'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500  before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700'
                      : ''
                    }`}
                >
                  {/* {value} */}
                  {option.name == "Color" ? <span
                    className={`h-10 w-10 rounded-md`}
                    style={{ backgroundColor: `#${value}` }}
                  >
                    { isActive &&
                      <span className="text-white flex items-center justify-center h-full"><BsCheckLg size={25} /></span>
                    }
                  </span> : value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
