import { relative } from 'path';
import copyStream from './copy-stream';
import transfer from '../option/transfer';

export default (from, to) => {
  relative(transfer, from) |> copyStream(?, transfer, to);
};