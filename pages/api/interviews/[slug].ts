import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';
import { ApiError } from '../../../lib/api/api-error';
import { Interview } from '../../../lib/domain/interview';

const handler: NextApiHandler<Interview | ApiError> = (req, res) => {
  switch (req.method) {
    default:
      res.status(405).send({
        name: 'Method not allowed',
      });
      break;
  }
};

export default withSentry(handler);

