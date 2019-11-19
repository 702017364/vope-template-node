import join from '../join';

const deps = {
  get value(){
    const { dependencies, devDependencies } = join('package.json') |> require;
    return Object.assign({}, dependencies, devDependencies);
  }
};

export default deps.value;
