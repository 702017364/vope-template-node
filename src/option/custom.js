import join from '../util/join';

let value = {};

try{
  value = join('template.js') |> require;
} catch{
  value = {}
}

export default value;