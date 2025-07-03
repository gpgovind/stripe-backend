const express = require('express');
const stripe = require('stripe')('sk_test_51RgiWgRcOfeSJwrf4newm9vGkWoQ7Or0lJZDwdAov6oNz1djDHC11cwY7je0p9qOWgkJzqnvYy5owwvuJG6oPmiq00HcxhiIdQ'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // e.g., 1000 = ₹10
      currency: currency,
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
