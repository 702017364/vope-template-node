import { copyPackage } from '../util';
import { config } from '../option';

export default async (cb) => {
  const { cdn } = config;
  cdn
    && cdn.length
    && await copyPackage(cdn);
  cb();
};