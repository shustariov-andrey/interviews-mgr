import React from 'react';
import { Profile } from '../../lib/domain/profile';
import Button from '../button';
import Card from '../card/card';
import CardBody from '../card/card-body';
import CardFooter from '../card/card-footer';
import InputControl from '../form/input-control';
import Section from '../section/section';

interface InterviewProfileSectionProps {
  profile: Profile;
  setProfile: (item: Profile) => void;
  deleteInterview: () => Promise<void>;
  saveInterview: () => Promise<void>;
}

const InterviewProfileSection: React.FC<InterviewProfileSectionProps> = ({profile, setProfile, deleteInterview, saveInterview}) => {
  const updateProfile = (diff: Partial<Profile>) => {
    setProfile({
      ...profile,
      ...diff
    });
  }
  return (
    <>
      <Section title="Interview Information" subtitle="Interview and candidates basic information">
        <form action="#" method="POST">
          <Card>
            <CardBody>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <InputControl
                    value={profile.name}
                    name="candidate"
                    autoComplete="name"
                    label="Candidate"
                    onInput={name => updateProfile({ name: name })}/>
                </div>
                <div className="col-span-6">
                  <InputControl name="position" label="Position" onInput={(position => updateProfile({ position }))}
                                value={profile.position}/>
                </div>
                <div className="col-span-6">
                  <InputControl
                    value={profile.date}
                    name="date"
                    type="date"
                    label="Date"
                    onInput={date => updateProfile({ date })}/>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-end items-center">
                <div className="mr-2">
                  <Button onClick={deleteInterview} theme="red">Delete</Button>
                </div>
                <div>
                  <Button onClick={saveInterview} theme="indigo">Save</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Section>
    </>
  )
};

export default InterviewProfileSection;
