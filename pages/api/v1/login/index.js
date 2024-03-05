// Packages
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST':
        console.log('POST /api/v1/login');

        if (!req.body.password || req.body.password !== process.env.ADMIN_PASSWORD)
          return res.status(401).json({
            status: 'error',
            data: {
              error: 'Incorrect password',
            },
          });

        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
          expiresIn: `${process.env.JWT_EXPIRES_IN}d`,
        });

        res.setHeader(
          'Set-Cookie',
          serialize('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: req.headers['x-forwarded-protocol'] === 'https',
            path: '/',
          }),
        );

        return res.status(200).json({
          status: 'success',
          data: {
            token,
          },
        });

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
