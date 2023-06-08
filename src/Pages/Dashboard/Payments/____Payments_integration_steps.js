/**
 * 1. Install Stripe and react Stripe js
 * 2. create a checkout form with card elements (card element contains: Card Number, Expiration date, CVS, Zip Code )
 * 3. Create Account on Stripe and get the publishable Key
 * 4. get Card information
 * 5. Create a payment Method
 * 6. use Test Card
 *
 * ============================
 *      On The Server Side
 * ============================
 * 7. install: npm install --save stripe
 * 8. create a payment intent api with payment method types and secret
 * 9. make sure you provide amount in cents (Multiply Price by 100)
 *
 *
 * 10. call payment intent api to get client secret and store to in a state
 * 11. use confirmCardPayment Api with client secret and card info
 * 11. Display confirm card error and success
 * 12. do things after payments
 * */
