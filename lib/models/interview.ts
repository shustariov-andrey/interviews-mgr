import { Model, model, models, Schema } from 'mongoose';
import { Interview } from '../domain/interview';
import { Profile } from '../domain/profile';

const interviewSchema = new Schema<Interview>({
  ownerId: { type: Schema.Types.ObjectId, required: true },
  profile: new Schema<Profile>({
    name: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: String, required: true },
  }, {
    _id: false,
  }),
  skills: [new Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 5 },
  }, {
    _id: false,
  })],
  notes: { type: String, required: false },
});

export default models.Interview as Model<Interview> || model<Interview>('Interview', interviewSchema);
