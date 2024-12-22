import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Helper to determine the range of pages to display
  const getDisplayedPages = () => {
    const pages = [];
    const range = 1; // Number of pages to show on each side of the current page

    if (totalPages <= 5) {
      // If total pages are less than or equal to 7, display all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always include the first page
      pages.push(1);

      if (currentPage > range + 2) {
        // Add dots if there are pages hidden on the left
        pages.push("...");
      }

      // Display the range of pages around the current page
      for (
        let i = Math.max(2, currentPage - range);
        i <= Math.min(totalPages - 1, currentPage + range);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - range - 1) {
        // Add dots if there are pages hidden on the right
        pages.push("...");
      }

      // Always include the last page
      pages.push(totalPages);
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex justify-center items-center mt-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-2 mx-1 rounded ${
          currentPage === 1
            ? "bg-gray-400 opacity-0 text-gray-700 cursor-not-allowed"
            : "bg-gray-700  opacity-80 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Prev
      </button>

      {/* Page Buttons */}
      {displayedPages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 mx-1 rounded ${
              page === currentPage
                ? "bg-gray-700 text-white"
                : "bg-gray-700  opacity-60 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="px-3 py-2 mx-1 rounded text-gray-400 cursor-default"
          >
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 mx-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-400 opacity-0 text-gray-700 cursor-not-allowed"
            : "bg-gray-700  opacity-80 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
