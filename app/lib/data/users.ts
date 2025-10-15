import { db } from '../db/Database'
import { jsonBuildObject } from 'kysely/helpers/postgres'
import { isAfter } from 'date-fns'

export interface MembershipSummary {
  level: string;
  status: string;
  joinedAt: Date | string;
}

export interface UserContext {
  id?: string | null;
  alias?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  membership?: {
    level: string | null;
    status: string | null;
    joinedAt: string | null;
  } | null;
  isSubscriber?: boolean | null;
  roles?: string[] | null;
}

export const UserDataAccess = {
  async getUserContext(userId: string): Promise<UserContext | undefined> {
    console.log('🔍 [GET USER CONTEXT] Getting user context for user:', userId)
    const result = await db
      .selectFrom('users')
      .leftJoin('memberships', 'users.id', 'memberships.user_id')
      .select([
        'users.id',
        'users.alias',
        'users.email',
        'users.image as avatarUrl',
        (eb) => jsonBuildObject({
          level: eb.ref('memberships.level'),
          status: eb.ref('memberships.status'),
          joinedAt: eb.ref('memberships.joined_at'),
        }).as('membership')
      ])
      .where('users.id', '=', userId)
      .executeTakeFirst()

    const hasActiveSubscription = await UserDataAccess.hasActiveSubscription(userId)

    const roles = await UserDataAccess.getUserRoles(userId)
    return {
      ...result,
      roles,
      isSubscriber: hasActiveSubscription,
    }
  },

  async getUserRoles(userId: string): Promise<string[]> {
    const result = await db
      .selectFrom('user_roles')
      .select('role_id')
      .where('user_id', '=', userId)
      .execute()
    return result.map((r) => r.role_id)
  },

  async hasActiveSubscription(userId: string): Promise<boolean> {
    const result = await db
      .selectFrom('stripe_subscriptions')
      .select(['id', 'status', 'current_period_end', 'current_period_start', 'interval', 'payment_status'])
      .where('user_id', '=', userId)
      .orderBy('current_period_start', 'desc')
      .executeTakeFirst()

    const isActive = result?.status == 'active'
    const isPaid = result?.payment_status == 'paid'
    const isCurrent = !!result?.current_period_end && isAfter(result?.current_period_end, new Date())

    return isActive && isPaid && isCurrent
  },
}