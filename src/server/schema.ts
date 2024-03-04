import { char, timestamp,  pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  username: text("username").unique().notNull(),
  passhash: text("passhash").notNull(),
});

export const sessions = pgTable("sessions", {
  id: char("id", { length: 43 }).primaryKey().notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull()
})

export type User = typeof users.$inferInsert;
export type Session = typeof sessions.$inferInsert;