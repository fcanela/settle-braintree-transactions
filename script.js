const braintree = require('braintree');

/*
 * Credentials configuration
 */
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Production,
  merchantId: 'place the merchant id here',
  publicKey: 'place the public key here',
  privateKey: 'place the private key here',
});

gateway.transaction.search((search) => {
  // We search only for Authorized transactions as we want to avoid 
  // changing the status to transactions with other state
  search.status().is(braintree.Transaction.Status.Authorized);
}, (err, response) => {
  if (err) return console.error(err);

  response.each((err, transaction) => {
    if (err) return console.error(err);

    const { 
      // This field is mandatory for settling
      id,
      // These other fields are just to provide a "pretty" output
      amount,
      currencyIsoCode,
      customer: { firstName, lastName, id: customerId },
    } = transaction;

    // We mark the transaction as settled
    gateway.transaction.submitForSettlement(id, (err, result) => {
      if (err) return console.error(err);

      if (!result.success) return console.error(`ERROR al processar la transacción #${id} de ${firstName} ${lastName} (#${customerId}). Valor: ${amount} ${currencyIsoCode}`);

      console.log(`Procesada transacción #${id} de ${firstName} ${lastName} (#${customerId}). Valor: ${amount} ${currencyIsoCode}`);
    });
  });
});
