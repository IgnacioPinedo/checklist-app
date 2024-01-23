// Middleware
import connectDB from 'middleware/mongodb';
import { protect } from 'middleware/auth';

// Helpers
import { getChecklists, createChecklist } from 'helpers/checklist';

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        const checklists = await getChecklists();

        return res.status(200).json({
          status: 'success',
          data: {
            checklists,
          },
        });

      case 'POST':
        return protect(async (req, res) => {
          const id = await createChecklist(req.body);

          return res.status(201).json({
            status: 'success',
            data: {
              id,
            },
          });
        })(req, res);
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
