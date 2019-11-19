import { join } from 'path';
import { __transfer } from '../../option';
import cdn from './cdn';

export default (value) => {
  return value.slice(0, 1) == '/'
    ? value.slice(1) |> join(__transfer, ?)
    : join(cdn, value);
};