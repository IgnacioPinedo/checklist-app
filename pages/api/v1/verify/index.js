// Middleware
import { protect } from 'middleware/auth';

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        console.log('GET /api/v1/verify');

        return await protect(async (req, res) => {
          return res.status(200).json({
            status: 'success',
            data: {
              message: 'Verfied',
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

export default handler;
