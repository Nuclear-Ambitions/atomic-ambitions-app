import { db } from './Database'
import { jsonBuildObject } from 'kysely/helpers/postgres'

export interface MembershipSummary {
  level: string;
  status: string;
  joinedAt: Date | string;
}

export interface UserContext {
  id: string;
  alias?: string | null;
  avatarUrl?: string | null;
  membership?: {
    level: string | null;
    status: string | null;
    joinedAt: string | null;
  } | null;
}

export const UserDataAccess = {
  async getUserContext(userId: string): Promise<UserContext | undefined> {
    const result = await db
      .selectFrom('users')
      .leftJoin('memberships', 'users.id', 'memberships.user_id')
      .select([
        'users.id',
        'users.alias',
        'users.image as avatarUrl',
        (eb) => jsonBuildObject({
          level: eb.ref('memberships.level'),
          status: eb.ref('memberships.status'),
          joinedAt: eb.ref('memberships.joined_at'),
        }).as('membership')
      ])
      .where('users.id', '=', userId)
      .executeTakeFirst()

    return result
  },
}