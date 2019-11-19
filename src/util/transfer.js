import abs from './abs';
import join from './join';

export default (value, key) => join(key) |> abs(value, ?);