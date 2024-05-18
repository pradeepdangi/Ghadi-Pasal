import asyncHandler from '../middleware/asyncHandler.js';
import axios from 'axios';

const khalti = asyncHandler(async (req, res) => {
  const { amount, customerName, customerEmail, customerAddress, orderId } = req.body;
  console.log(amount, customerName, customerEmail, customerAddress);
  
  const MIN_AMOUNT = 10.0;
  const MAX_AMOUNT = 100000.0;
  let adjustedAmount = amount;
  if (amount < MIN_AMOUNT) {
    adjustedAmount = MIN_AMOUNT;
  } else if (amount > MAX_AMOUNT) {
    adjustedAmount = MAX_AMOUNT;
  }

  const requestData = {
    return_url: `http://localhost:3000/order/${orderId}`,
    website_url: "http://localhost:3000/order",
    amount: adjustedAmount * 100,
    purchase_order_id: "Order01",
    purchase_order_name: "test",
    customer_info: {
      name: customerName,
      email: customerEmail,
      Address: customerAddress
    }
  };

  const config = {
    headers: {
      'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', requestData, config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while initiating payment.' });
  }
});

export { khalti };