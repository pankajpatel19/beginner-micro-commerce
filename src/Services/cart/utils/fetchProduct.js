import axios from "axios";

function getToken(req, res) {
  try {
    const token = req.cookies?.token;

    return token;
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchProduct(req, productId) {
  const token = getToken(req);
  try {
    const response = await axios.get(
      `http://localhost:5002/api/product/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export default fetchProduct;
