// Middleware
import connectDB from 'middleware/mongodb';
import { protect } from 'middleware/auth';

// Helpers
import { getChecklistBySlug, updateChecklistBySlug, deleteChecklistBySlug } from 'helpers/checklist';

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        console.log('GET /api/v1/checklists/[slug]');

        const checklist = await getChecklistBySlug(req.query.slug);

        return res.status(200).json({
          status: 'success',
          data: { checklist },
        });
      case 'PUT':
        console.log('PUT /api/v1/checklists/[slug]');

        return await protect(async (req, res) => {
          await updateChecklistBySlug(req.query.slug, req.body);

          return res.status(204).json();
        })(req, res);
      case 'DELETE':
        console.log('DELETE /api/v1/checklists/[slug]');

        return await protect(async (req, res) => {
          await deleteChecklistBySlug(req.query.slug);

          return res.status(204).json();
        })(req, res);
      default:
        return res.status(404).json({});
    }
  } catch (err) {
    console.error(err);

    if (err.internalError)
      return res.status(err.status).json({
        status: 'error',
        data: {
          error: err.data.error,
        },
      });

    return res.status(500).json({
      status: 'error',
      data: {
        error: 'Internal Server Error',
      },
    });
  }
};

export default connectDB(handler);
