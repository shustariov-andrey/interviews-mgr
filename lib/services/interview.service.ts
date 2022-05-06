import { HydratedDocument } from 'mongoose';
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
    let saved: HydratedDocument<Interview>;
    if (!interview._id) {
      const model = new InterviewModel({
        ...interview,
        ownerId: session.id,
      });
      saved = await model.save();
    } else {
      saved = await InterviewModel
        .findOneAndUpdate({ _id: interview._id }, { ...interview, ownerId: session.id }, {
          upsert: true,
          setDefaultsOnInsert: true,
          returnDocument: 'after'
        })
        .exec();
    }
    return this.mapToPojo(saved?.toJSON({ versionKey: false }));
  }

  async findAll(session: Session): Promise<Interview[]> {
    await dbConnect();
    const docs = await InterviewModel.find({
      ownerId: session.id,
    }).lean().exec();
    return docs.map(doc => this.mapToPojo(doc));
  }

  async findById(session: Session, id: string): Promise<Interview | null> {
    await dbConnect();
    const doc = await InterviewModel.findById(id).lean().exec();
    if (doc?.ownerId.toString() === session.id) {
      return this.mapToPojo(doc!);
    }
    return null;
  }

  private mapToPojo(doc: Interview): Interview {
    return {
      ...doc,
      _id: doc._id?.toString(),
      ownerId: doc.ownerId.toString(),
    };
  }

}
