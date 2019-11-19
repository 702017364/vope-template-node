import { unlinkSync } from 'fs';
import { relative, join } from 'path';
import transfer from '../option/transfer';

export default (from, to) => {
  relative(transfer, from)
    |> join(to, ?)
    |> unlinkSync;
};