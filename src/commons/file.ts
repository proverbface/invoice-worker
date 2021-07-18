import * as fs from 'fs';
import {logger} from './logger';

export const isDirectory = (path: string): boolean => {
  if (!path) {
    logger.error('Path is required');
    return false;
  }

  try {
    return fs.lstatSync(path)?.isDirectory();
  } catch (error) {
    logger.error('Could not find file', path, error);
    return false;
  }
};

export const deleteFile = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!path) {
      logger.error('Path is required');
      resolve(false);
      return;
    }

    fs.unlink(path, (error) => {
      if (error) {
        logger.error('Could not delete file', path, error);
        resolve(false);
      }
      resolve(true);
    });
  });
};

export const fileExists = (path: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    if (!path) {
      logger.error('Path is required');
      resolve(false);
      return;
    }

    fs.lstat(path, (error) => {
      if (error) {
        logger.error('Could not find file', path, error);
        resolve(false);
      }
      resolve(true);
    });
  });
};
