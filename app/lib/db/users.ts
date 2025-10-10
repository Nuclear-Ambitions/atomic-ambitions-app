import { db } from './Database'

export interface MembershipSummary {
  level: string;
  status: string;
  joinedAt: Date;
}

export interface UserContext {
  id: string;
  alias?: string;
  avatarUrl?: string;
  level?: string;
  status?: string;
  joinedAt?: Date;
}

export const UserDataAccess = {
  async getUserContext(userId: string): Promise<UserContext | undefined> {
    const userContext = await db
      .selectFrom('users')
      .leftJoin('memberships', 'users.id', 'memberships.user_id')
      .select([
        'users.id',
        'users.alias',
        'users.image as avatarUrl',
        'memberships.level',
        'memberships.status',
        'memberships.joined_at',
      ])
      .where('users.id', '=', userId)
      .executeTakeFirst()
    return userContext as UserContext
  },
}