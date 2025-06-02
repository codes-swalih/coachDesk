import Shihan from '@/models/shihan/ShihanModel';
import { verifyToken } from './verifyToken';
import Sensai from '@/models/sensai/SensaiModel';

export const protectShihan = async (req: Request) => {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return {
      error: 'No Auth header or not a bearer token',
      status: 401,
    };
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return {
      error: 'Not authorized, no token',
      status: 401,
    };
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return {
        error: 'Invalid token',
        status: 401,
      };
    }

    const shihan = await Shihan.findById(decoded.id);
    if (!shihan) {
      return {
        error: 'Shihan not found',
        status: 404,
      };
    }
    return {
      shihan,
      status: 200,
    };
  } catch (error) {
    return {
      error: 'Server error',
      status: 500,
    };
  }
};

export const protectSensai = async (req: Request) => {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return {
      error: 'No Auth header or not a bearer token',
      status: 401,
    };
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return {
      error: 'Not authorized, no token',
      status: 401,
    };
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      return {
        error: 'Invalid token',
        status: 401,
      };
    }
    const sensai = await Sensai.findById(decoded.id);
    if (!sensai) {
      return {
        error: 'sensai not found',
        status: 404,
      };
    }
    return {
      sensai,
      status: 200,
    };
  } catch (error) {
    return {
      error: 'Server error',
      status: 500,
    };
  }
};
