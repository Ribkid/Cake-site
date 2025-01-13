import { Client, Environment } from 'square';

const client = new Client({
  accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export const createPaymentLink = async (bookingId: string, amount: number) => {
  try {
    if (!import.meta.env.VITE_SQUARE_ACCESS_TOKEN) {
      throw new Error('Square access token not configured');
    }

    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: `booking_${bookingId}`,
      quickPay: {
        name: 'Studio Session Deposit',
        priceMoney: {
          amount: Math.round(amount * 100), // Convert to cents and ensure integer
          currency: 'AUD'
        },
      },
      redirectUrl: `${window.location.origin}/booking/confirmation/${bookingId}`
    });

    if (!response.result.paymentLink) {
      throw new Error('Failed to create payment link');
    }

    return response.result.paymentLink;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};