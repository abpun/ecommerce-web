import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPaginationItems = () => {
    const paginationItems: (number | string)[] = []; // Define type for pagination items
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(i);
      }
    } else {
      if (currentPage < 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          paginationItems.push(i);
        }
        paginationItems.push('...', totalPages);
      } else if (currentPage > totalPages - 2) {
        paginationItems.push(1, '...');
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          paginationItems.push(i);
        }
      } else {
        paginationItems.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          paginationItems.push(i);
        }
        paginationItems.push('...', totalPages);
      }
    }

    return paginationItems;
  };

  const paginationItems = getPaginationItems();

  return (
    <div>
      {paginationItems.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === currentPage}
          className="px-4 py-2 mx-1 bg-slate-500 text-white cursor-pointer rounded disabled:opacity-50"
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
