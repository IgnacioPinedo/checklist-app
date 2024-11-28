// Middleware
import connectDB from 'middleware/mongodb';
import { protect } from 'middleware/auth';

// Helpers
import { getChecklists, createChecklist } from 'helpers/checklist';

const allowedSortBy = ['name', 'createdAt', 'updatedAt'];
const allowedOrderBy = ['asc', 'desc'];

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        console.log('GET /api/v1/checklists');

        const { sort_by, order_by } = req.query;

        if (sort_by && !allowedSortBy.includes(sort_by)) {
          return res.status(400).json({
            status: 'error',
            data: {
              error: `sort_by must be one of ${allowedSortBy.join(', ')}`,
            },
          });
        }

        if (order_by && !allowedOrderBy.includes(order_by)) {
          return res.status(400).json({
            status: 'error',
            data: {
              error: `order_by must be one of ${allowedOrderBy.join(', ')}`,
            },
          });
        }

        const checklists = await getChecklists(sort_by, order_by);

        return res.status(200).json({
          status: 'success',
          data: {
            checklists,
          },
        });

      case 'POST':
        console.log('POST /api/v1/checklists');

        return await protect(async (req, res) => {
          const slug = await createChecklist(req.body);

          return res.status(201).json({
            status: 'success',
            data: {
              slug,
            },
          });
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
