import axios from 'axios';
import { apiCall } from '../utils/api';

describe('api call test', () => {
  test('should pass', () => {
    const testData = { movie: 'test', name: 'SW' };

    const response = { json: jest.fn().mockResolvedValueOnce(testData) };
    global.fetch = jest.fn().mockResolvedValueOnce(response);

    return apiCall().then((data) => {
      expect(data).toEqual(testData);
    });
  });
});