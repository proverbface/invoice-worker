import {deleteFile, fileExists, isDirectory} from './file';
import mock from 'mock-fs';

describe('file', () => {
  afterEach(mock.restore);

  describe('is directory', () => {
    it('should return true when is a directory', () => {
      mock({
        'path/to/fake/dir': {
          'some-file.txt': 'file content here',
        },
      });
      expect(isDirectory('path/to/fake/dir')).toBeTruthy();
    });
    it('should return false when directory does not exist', () => {
      expect(isDirectory('path/to/fake/dir')).toBeFalsy();
    });
    it('should return false when is not a directory', () => {
      mock({
        'path/to/fake/dir/some-file': 'file content here',
      });
      expect(isDirectory('path/to/fake/dir/some-file')).toBeFalsy();
    });
  });
  describe('delete file', () => {
    it('should delete file and return true if the file exists', async () => {
      mock({
        'path/to/fake/dir/some-file': 'file content here',
      });
      expect(await deleteFile('path/to/fake/dir/some-file')).toBeTruthy();
    });
    it('should not delete directories', async () => {
      mock({
        'path/to/fake/dir': {
          'some-file': 'file content here',
        },
      });
      expect(await deleteFile('path/to/fake/dir')).toBeFalsy();
    });
    it('should not delete file and return false if the file cannot be deleted or does not exist', async () => {
      expect(await deleteFile('path/to/fake/dir/some-file')).toBeFalsy();
    });
  });
  describe('file exists', () => {
    it('should return true when file exists', async () => {
      mock({
        'path/to/fake/dir/some-file': 'file content here',
      });
      expect(await fileExists('path/to/fake/dir/some-file')).toBeTruthy();
    });
    it('should return false when file does not exist', async () => {
      expect(await fileExists('path/to/fake/dir/some-file')).toBeFalsy();
    });
  });
});
