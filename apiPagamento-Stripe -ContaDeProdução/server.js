const express = require('express');
const Stripe = require('stripe');
const path = require('path');

const stripe = Stripe('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'); // chave secreta

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
