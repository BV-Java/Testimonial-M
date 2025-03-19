import React from "react";
import { ButtonGray } from "../Buttons";

const ChangePage = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-around mt-10">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      <p className="font-medium text-lg">{`Page ${currentPage} of ${totalPages}`}</p>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default ChangePage;
