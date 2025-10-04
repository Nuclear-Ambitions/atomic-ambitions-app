import { db } from './Database'

export const SubscriptionDataAccess = {

  async updateUserStripeCustomerId(userId: string, stripeCustomerId: string) {
    return await db
      .updateTable('users')
      .set({ stripe_customer_id: stripeCustomerId })
      .where('id', '=', userId)
      .execute()
  },

  async insertPayment(payment: {
    id: string
    stripe_payment_intent_id: string | null
    amount: number
    currency: string
    subscription_id: string | null
  }) {
    return await db
      .insertInto('payments')
      .values(payment)
      .onConflict((oc) => oc.column('id').doNothing())
      .execute()
  },

  async insertSubscription(subscription: {
    id: string
    stripe_subscription_id: string
    user_id: string
    status: string
    current_period_start: Date
    current_period_end: Date
    product_id: string
  }) {
    return await db
      .insertInto('subscriptions')
      .values({
        id: subscription.id,
        stripe_subscription_id: subscription.stripe_subscription_id,
        user_id: subscription.user_id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        product_id: subscription.product_id
      })
      .onConflict((oc) => oc.column('id').doNothing())
      .execute()
  },

  async updateMembershipStatus(userId: string, level: string, status: string) {
    return await db
      .insertInto('memberships')
      .values({
        user_id: userId,
        level: level,
        status: status,
        joined_at: new Date()
      })
      .onConflict((oc) => oc.column('user_id').doUpdateSet({
        level: level,
        status: status,
        joined_at: new Date()
      }))
      .execute()
  },

  async getUserById(userId: string) {
    return await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', userId)
      .executeTakeFirst()
  },

  async getMembershipByUserId(userId: string) {
    return await db
      .selectFrom('memberships')
      .selectAll()
      .where('user_id', '=', userId)
      .executeTakeFirst()
  },

  async getSubscriptionByUserId(userId: string) {
    return await db
      .selectFrom('subscriptions')
      .selectAll()
      .where('user_id', '=', userId)
      .executeTakeFirst()
  },
}