import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { CSVLink } from "react-csv";
import DownloadCSV from "./DownloadCSV";

const TableContainer = ({}) => {
  const columns = [
    {
      title: "Product",
      dataIndex: "thumbnail",
      width: 150,
      fixed: "left",
      render: (product) => (
        <img
          src={product}
          className="image"
          alt={product}
          width="100px"
          height="70px"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 250,
      fixed: "left",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => "$" + price,
      width: 100,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (price) => price + "%",
      width: 150,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      width: 100,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      width: 150,
    },
    {
      title: "category",
      dataIndex: "category",
      filterMode: "tree",
      width: 150,
      filters: [
        {
          text: "Mens",
          value: "mens",
          children: [
            {
              text: "Mens Shirts",
              value: "mens-shirts",
            },
            {
              text: "Mens Watches",
              value: "mens-watches",
            },
          ],
        },
        {
          text: "Women",
          value: "women",
          children: [
            {
              text: "Tops",
              value: "tops",
            },
            {
              text: "Womens Dresses",
              value: "womens-dresses",
            },
            {
              text: "Womens Shoes",
              value: "womens-shoes",
            },

            {
              text: "Womens Watches",
              value: "womens-watches",
            },
            {
              text: "Womens Bags",
              value: "womens-bags",
            },
            {
              text: "Womens Jewellery",
              value: "womens-jewellery",
            },
          ],
        },
        {
          text: "Electronics",
          value: "electronics",
          children: [
            {
              text: "Smart phones",
              value: "smartphones",
            },
            {
              text: "Laptops",
              value: "laptops",
            },
          ],
        },
        {
          text: "Home Decor",
          value: "homedecor",
          children: [
            {
              text: "Home Decoration",
              value: "home-decoration",
            },
            {
              text: "Furniture",
              value: "furniture",
            },
            {
              text: "Lighting",
              value: "lighting",
            },
          ],
        },
        {
          text: "Fragrances",
          value: "fragrances",
        },
        {
          text: "Skincare",
          value: "skincare",
        },
        {
          text: "Groceries",
          value: "groceries",
        },

        {
          text: "Sunglasses",
          value: "sunglasses",
        },
        {
          text: "Automotive",
          value: "automotive",
        },
        {
          text: "Motorcycle",
          value: "motorcycle",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: "Details",
      dataIndex: "id",
      width: 120,
      fixed: "right",
      render: (product) => (
        <Link to={"/details/" + product} className="text-[#3e94ff]">
          View Details
        </Link>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [response, setResponse] = useState({
    apiStatus: 0,
    data: null,
    error: null,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const startFn = () => {
    start();
  };
  useEffect(() => {
    startFn();
  }, []);
  useEffect(() => {
    console.log(selectedRowKeys);
    if (response.data) {
      let exportData = response.data.filter((product) =>
        selectedRowKeys.includes(product.id)
      );
      setSelectedRows(exportData);
    }
  }, [selectedRowKeys]);
  const start = () => {
    setLoading(true);
    getData();
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const getData = async () => {
    try {
      let req = await fetch("https://dummyjson.com/products?limit=100");
      let res = await req.json();
      console.log(res);
      let modifiedResponse = [];
      for (let i = 0; i < res.products.length; i++) {
        let obj = { ...res.products[i], key: res.products[i].id };
        modifiedResponse.push(obj);
      }
      console.log(modifiedResponse);
      setResponse({
        apiStatus: 1,
        data: modifiedResponse,
        error: null,
      });
      setFilteredData(modifiedResponse);
    } catch (error) {
      console.log(error);
      setResponse({
        apiStatus: -1,
        data: null,
        error: error,
      });
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSubmit = (search) => {
    if (!search) {
      setSearchTerm("");
      setFilteredData(response.data);
    }
    if (searchTerm && search) {
      let filteredData = response.data.filter((product) =>
        product?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      console.log(filteredData);
      setFilteredData(filteredData);
    }
  };

  return (
    <div className="px-[10%] pt-[5%] mx-auto">
      <div className="w-[400px] mx-auto mb-[2rem]">
        <form class="flex items-center">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <span
              onClick={() => handleSubmit(false)}
              className="material-symbols-outlined absolute top-[10px] right-[18px] cursor-pointer hover:scale-[1.2] duration-150"
            >
              close
            </span>
          </div>
          <button
            type="button"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleSubmit(true)}
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>
      </div>

      {response.apiStatus === 1 && (
        <div>
          <div className="flex justify-between px-2 py-3">
            <h2 className="font-bold text-xl">List of Products</h2>
            <DownloadCSV selectedRows={selectedRows} allData={response.data} />
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={response?.apiStatus === 1 && filteredData}
            rowKey="id"
            scroll={{
              y: 350,
              x: 200,
            }}
          />
        </div>
      )}
      {response.apiStatus === 0 && (
        <div className="h-[70vh] flex justify-center items-center">
          <Spin size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
    </div>
  );
};

export default TableContainer;
