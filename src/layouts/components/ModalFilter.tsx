"use client";

import ProductFilters from '@/partials/ProductFilters';
import React from 'react';

interface ModalFilterProps {
  isVisible: boolean;
  onClose: () => void;
}

const ModalFilter: React.FC<ModalFilterProps> = ({ isVisible, onClose }) => {

  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target && e.target instanceof HTMLDivElement && e.target.id === 'wrapper') {
      onClose();
    }
  };

  return (
    <>
      <div
        className="modal"
        id="wrapper"
        onClick={handleClose}
      >
        <div>
          <button className="modal-close" onClick={() => onClose()}>
            X
          </button>
          <div className="modal-content">
          {/* <ProductFilters
              categories={categories}
              vendors={vendors}
              tags={tags}
              maxPriceData={maxPriceData}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFilter;
