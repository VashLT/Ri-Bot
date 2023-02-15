import { Captcha } from './captcha.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  catpchas: Captcha[];
}
