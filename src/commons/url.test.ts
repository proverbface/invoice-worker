import {isUrl} from './url';

describe('url', () => {
  it('should return true when is a valid url', () => {
    expect(isUrl('192.1.1.192')).toBeTruthy();
    expect(isUrl('http://192.1.1.192')).toBeTruthy();
    expect(isUrl('http://192.1.1.192:4000')).toBeTruthy();
    expect(isUrl('http://domain.com')).toBeTruthy();
    expect(isUrl('https://domain.com')).toBeTruthy();
    expect(isUrl('localhost:4000')).toBeTruthy();
  });
  it('should return false when is an invalid url', () => {
    expect(isUrl('htt://domain')).toBeFalsy();
    expect(isUrl('192.1.1')).toBeFalsy();
    expect(isUrl('@#^@$^&$%*$*$^')).toBeFalsy();
  });
});
