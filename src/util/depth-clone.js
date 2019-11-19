const depthClone = (value) => {
  if(!value || typeof value != 'object') return value;
  if(value instanceof Array) return value.map(depthClone);
  const obj = {};
  for(let key in value){
    if(key != 'constructor' && value.hasOwnProperty(key)){
      obj[key] = value[key] |> depthClone;
    }
  }
  return obj;
};

export default depthClone;