import { CSVLink } from "react-csv";

const DownloadCSV = ({ selectedRows, allData }) => {
  const headers = [
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Price",
      key: "price",
    },
    {
      label: "Rating",
      key: "rating",
    },
    {
      label: "Stock",
      key: "stock",
    },
    {
      label: "Brand",
      key: "brand",
    },
    {
      label: "Category",
      key: "category",
    },
  ];
  const csvReport = {
    data: selectedRows.length !== 0 ? selectedRows : allData,
    headers: headers,
    filename: "export.csv",
  };
  return (
    <div>
      <button className="bg-[#358cf5] px-3 py-1 rounded text-[#fff]">
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
      </button>
    </div>
  );
};

export default DownloadCSV;
