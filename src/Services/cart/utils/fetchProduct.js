import axios from "axios";
async function fetchProduct(productId) {
  try {
    const response = await axios.get(
      `http://localhost:5002/api/product/products/${productId}`,
    );
    console.log("response : ", response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export default fetchProduct;
