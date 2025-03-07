import { MdOutlineStarBorder } from "react-icons/md";

const Products = () => {
  const products = [
    { id: 1, img: "/product-1.jpg", name: "Product 1", price: 64 },
    { id: 2, img: "/product-2.jpg", name: "Product 2", price: 72 },
    { id: 3, img: "/product-3.jpg", name: "Product 3", price: 85 },
    { id: 4, img: "/product-4.jpg", name: "Product 4", price: 95 },
    { id: 5, img: "/product-5.jpg", name: "Product 5", price: 100 },
    { id: 6, img: "/product-6.jpg", name: "Product 6", price: 60 },
    { id: 7, img: "/product-7.jpg", name: "Product 7", price: 120 },
    { id: 8, img: "/product-8.jpg", name: "Product 8", price: 80 },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-[196px] py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="justify-center items-center">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto"
            />
            <h4 className="text-sm font-semibold mt-6">{product.name}</h4>
            <div className="flex mt-2">
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
            </div>
            <h4 className="text-lg font-semibold mt-2">${product.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
