import { join } from 'path';
import abs from './abs';
import __transfer from '../option/transfer';

export default (value, key) => join(__transfer, key)
  |> abs(value, ?);