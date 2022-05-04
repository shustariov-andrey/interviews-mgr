import { Session } from 'next-auth';
import { Interview } from '../domain/interview';
import InterviewModel from '../models/interview';
import dbConnect from '../mongoose-connect';

export class InterviewService {
  private static instance: InterviewService = new InterviewService();

  protected constructor() {
  }

  static getInstance() {
    return InterviewService.instance;
  }

  async save(interview: Interview, session: Session): Promise<Interview> {
    await dbConnect();
    const model = new InterviewModel({
      ...interview,
      ownerId: session.id,
    });
    const saved = await model.save();
    return saved.toJSON({ versionKey: false });
  }

  async findAll(session: Session): Promise<Interview[]> {
    await dbConnect();
    const docs = await InterviewModel.find({
      ownerId: session.id,
    }).exec();
    return docs.map(doc => doc.toJSON({ versionKey: false }));
  }

}
