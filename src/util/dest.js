import { join } from 'path';
import { __transfer, T, develop } from '../option';

const format = (key) => {
  const value = T[key];
  return develop
    ? value
    : join(T.dist, value);
};

export default (key) => key
  |> format
  |> join(__transfer, ?);