const http = require('http');
const Stripe = require('stripe');

const stripe = Stripe('SECRET_KEY');

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/approve-payment') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString(); // Convertendo Buffer para string
        });

        req.on('end', async () => {
            try {
                const { paymentIntentId } = JSON.parse(body);

                // Capturando o PaymentIntent
                const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(paymentIntent));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
