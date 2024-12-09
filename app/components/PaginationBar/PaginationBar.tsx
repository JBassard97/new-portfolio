import React from "react";
import "./PaginationBar.css"; // Add your styles for the pagination bar

interface PaginationBarProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (page: number) => {
    setCurrentPage(page); // Update the current page
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

  return (
    <div className="pagination-bar">
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
  );
};

export default PaginationBar;
