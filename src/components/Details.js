import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useNavigate } from "react-router-dom";
import ReactToPdf from "react-to-pdf";

const Details = () => {
  const [param, setParam] = useState(null);
  const [response, setResponse] = useState({
    apiStatus: 0,
    data: null,
    error: null,
  });
  const ref = React.createRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let loc = location.pathname;
    setParam(loc.split("/")[2]);
    if (param) {
      getDataById();
    }
  }, [param]);

  const getDataById = async () => {
    try {
      let req = await fetch(`https://dummyjson.com/products/${param}`);
      let res = await req.json();
      console.log(res);
      setResponse({
        apiStatus: 1,
        data: res,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setResponse({
        apiStatus: -1,
        data: null,
        error: error,
      });
    }
  };
  return (
    <section class="overflow-hidden">
      {response.apiStatus === 1 && (
        <div class="mx-auto max-w-5xl px-5 py-24">
          <span
            class="material-symbols-outlined cursor-pointer hover:scale-125 duration-200"
            onClick={() => navigate(-1)}
          >
            arrow_back
          </span>
          <div class="mx-auto flex flex-wrap items-center lg:w-4/5" ref={ref}>
            <img
              alt="Nike Air Max 21A"
              class="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
              src={response.data.thumbnail}
            />
            <div class="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
              <h2 class="text-sm font-semibold tracking-widest text-gray-500">
                {response.data.brand}
              </h2>
              <h1 class="my-4 text-3xl font-semibold text-black">
                {response.data.title}
              </h1>
              <div class="my-4 flex items-center">
                <span class="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span class="ml-3 inline-block text-xs font-semibold">
                    {response.data.rating}
                  </span>
                </span>
              </div>
              <p class="leading-relaxed">{response.data.description}</p>
              <div class="flex items-center justify-between py-2">
                <span class="title-font text-lg font-semibold text-gray-700 line-through">
                  ${response.data.price}
                </span>
              </div>
              <span class="title-font text-md font-normal text-gray-900">
                Discounted Price
              </span>
              <span class="title-font text-xl font-bold text-gray-900 ml-2">
                $
                {(
                  response.data.price -
                  response.data.price * (response.data.discountPercentage / 100)
                )?.toFixed(2)}
              </span>
              <ReactToPdf targetRef={ref} filename="product.pdf">
                {({ toPdf }) => (
                  <button
                    type="button"
                    class="block mt-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={toPdf}
                  >
                    Download
                  </button>
                )}
              </ReactToPdf>
            </div>
          </div>
        </div>
      )}
      {response.apiStatus === 0 && (
        <div className="h-[70vh] flex justify-center items-center">
          <Spin size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
    </section>
  );
};

export default Details;
