import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

export const protect = (handler) => async (req, res) => {
  try {
    console.log('protect middleware');
    const cookies = new Cookies(req, res);

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (cookies.get('jwt')) {
      token = cookies.get('jwt');
    }

    if (!token) {
      console.log('No token');
      return res.status(401).json({
        status: 'error',
        data: {
          error: 'You are not log in! Please log in to get access.',
        },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.admin !== true) {
      console.log('Not admin');
      return res.status(401).json({
        status: 'error',
        data: {
          error: 'You are not authorized to perform this action.',
        },
      });
    }

    return handler(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      data: {
        error: 'Internal Server Error',
      },
    });
  }
};
