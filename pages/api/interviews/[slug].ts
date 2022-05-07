import { withSentry } from '@sentry/nextjs';
import mongoose from 'mongoose';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import { ApiError } from '../../../lib/api/api-error';
import { Interview } from '../../../lib/domain/interview';
import { InterviewService } from '../../../lib/services/interview.service';

const handler: NextApiHandler<Interview | ApiError | void> = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({
      name: 'Unauthorized',
    });
    return;
  }
  const interviewId = req.query.slug;
  switch (req.method) {
    case 'PUT':
      try {
        const saved = await InterviewService.getInstance().save(req.body, session);
        res.status(200).json(saved);
      } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
          res.status(400).json({
            name: e.name,
            message: e.message,
          });
        } else {
          throw e;
        }
      }
      break;
    case 'DELETE':
      await InterviewService.getInstance().deleteById(session.id as string, interviewId as string);
      res.status(204).send();
      break;
    default:
      res.status(405).send({
        name: 'Method not allowed',
      });
      break;
  }
};

export default withSentry(handler);

