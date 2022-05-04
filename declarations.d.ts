import { Mongoose } from 'mongoose';

declare global {
  declare var mongoose: {
    conn: Mongoose | null,
    promise: Promise<Mongoose> | null,
  };
}
