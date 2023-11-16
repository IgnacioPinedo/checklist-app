// Middleware
import connectDB from 'middleware/mongodb';

// Helpers
import { getChecklist, updateChecklist, deleteChecklist } from 'helpers/checklist';

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        const checklist = await getChecklist(req.query.id);

        return res.status(200).json({
          status: 'success',
          data: { checklist },
        });
      case 'PUT':
        await updateChecklist(req.query.id, req.body);

        return res.status(204).json();
      case 'DELETE':
        await deleteChecklist(req.query.id);

        return res.status(204).json();
      default:
        return res.status(404).json({});
    }
  } catch (err) {
    if (err.internalError)
      return res.status(err.status).json({
        status: 'error',
        data: {
          error: err.data.error,
        },
      });

    console.error(err);
    return res.status(500).json({
      status: 'error',
      data: {
        error: 'Internal Server Error',
      },
    });
  }
};

export default connectDB(handler);
