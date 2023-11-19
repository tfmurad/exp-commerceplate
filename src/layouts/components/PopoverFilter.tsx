import ProductFilters from '@/partials/ProductFilters'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function PopoverFilter({categories,vendors,tags,maxPriceData}:any) {
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-text dark:text-darkmode-light' : 'text-text/90 dark:text-darkmode-light'}`}
            >
              <span>+ Filter</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-40 sm:left-48 z-10 mt-3 w-screen max-w-xs sm:max-w-sm -translate-x-1/2 transform px-6 pb-6 rounded-md lg:max-w-3xl bg-body dark:bg-darkmode-body drop-shadow-2xl">
							<ProductFilters
              categories={categories}
              vendors={vendors}
              tags={tags}
              maxPriceData={maxPriceData}
            />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}