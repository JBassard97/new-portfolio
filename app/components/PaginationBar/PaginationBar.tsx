import React from "react";
import "./PaginationBar.css";

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setSortType: (type: string) => void; // Sorting handler from parent
  setItemsPerPage: (items: number) => void;
  projectsTotal: number;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
  setSortType,
  setItemsPerPage,
  projectsTotal,
}) => {
  const handlePageClick = (page: number) => {
    setCurrentPage(page); // Update the current page
    window.scrollTo(0, 0); // Scroll to top
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value); // Call sorting handler in parent
    window.scrollTo(0, 0); // Scroll to top
    setCurrentPage(1); // Reset to the first page
  };

  const handleItemsPerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    window.scrollTo(0, 0);
    setCurrentPage(1);
  };

  return (
    <div className="pagination-bar">
      <div className="sort-options">
        <span>Sort:</span>
        <select onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="name a-z">Name A-Z</option>
          <option value="name z-a">Name Z-A</option>
          <option value="stack high-low">Technologies &darr;</option>
          <option value="stack low-high">Technologies &uarr;</option>
        </select>
      </div>
      <div className="items-per-page">
        <span>Per Page:</span>
        <select onChange={handleItemsPerChange}>
          <option value="10">10</option>
          {projectsTotal > 10 && <option value="15">15</option>}
          {projectsTotal > 15 && <option value="20">20</option>}
        </select>
      </div>
      <div className="page-buttons">
        <span>Page:</span>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginationBar;
