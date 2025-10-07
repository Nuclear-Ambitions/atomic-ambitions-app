import { db } from './Database'

export interface SubscriptionData {
  id: string;
  stripeCustomerId: string;
  userId: string;
  customerEmail: string | null;
  totalAmount: number | null;
  currency: string | null;
  priceId: string;
  productId: string;
  amount: number | null;
  interval: string;
  paymentStatus: string | null;
  status: string | null;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  subscription_id?: string;
}

export const SubscriptionDataAccess = {

  async getSubscription(subscriptionId: string) {
    return await db
      .selectFrom('stripe_subscriptions')
      .select(['id', 'total_amount', 'currency', 'interval', 'payment_status', 'status', 'current_period_start', 'current_period_end'])
      .where('id', '=', subscriptionId)
      .execute()
  },

  async subscriptionExists(subscriptionId: string): Promise<boolean> {
    const result = await db
      .selectFrom('stripe_subscriptions')
      .select(['id'])
      .where('id', '=', subscriptionId)
      .execute()
    return result.length > 0
  },

  async updateUserStripeCustomerId(userId: string, stripeCustomerId: string) {
    return await db
      .updateTable('users')
      .set({ stripe_customer_id: stripeCustomerId })
      .where('id', '=', userId)
      .execute()
  },

  async insertSubscription(subData: SubscriptionData): Promise<{ id: string }[]> {
    return await db
      .insertInto('stripe_subscriptions')
      .values({
        id: subData.id,
        stripe_customer_id: subData.stripeCustomerId,
        user_id: subData.userId,
        customer_email: subData.customerEmail,
        total_amount: subData.totalAmount,
        currency: subData.currency,
        price_id: subData.priceId,
        product_id: subData.productId,
        amount: subData.amount,
        interval: subData.interval,
        payment_status: subData.paymentStatus,
        status: subData.status,
        current_period_start: subData.currentPeriodStart,
        current_period_end: subData.currentPeriodEnd,
      })
      .onConflict((oc) => oc.column('id').doNothing())
      .returning('id')
      .execute()
  },

  async setMembershipLevel(userId: string, level: string) {
    await db
      .updateTable('memberships')
      .set({
        level,
        updated_at: new Date()
      })
      .where('user_id', '=', userId)
      .execute()
    return
  },
}