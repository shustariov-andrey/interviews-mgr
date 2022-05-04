import { Profile } from './profile';
import { Skill } from './skill';

export interface Interview {
  ownerId: string;
  _id: string;
  profile: Profile;
  skills: Skill[];
  notes: string;
}
