import { join } from 'path';
import __transfer from '../option/transfer';

export default (...list) => {
  return join(__transfer, ...list);
};