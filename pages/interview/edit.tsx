import { NextPage } from 'next';
import React, { useState } from 'react';
import Card from '../../components/card/card';
import CardBody from '../../components/card/card-body';
import CardFooter from '../../components/card/card-footer';
import InputControl from '../../components/form/input-control';
import InterviewSkillsSection from '../../components/interview/interview-skills-section';
import Section from '../../components/section/section';
import SectionSeparator from '../../components/section/section-separator';
import { Skill } from '../../lib/domain/skill';

const InterviewEdit: NextPage = () => {
  const [candidate, setCandidate] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const onSubmit: () => Promise<void> = async () => {
    await fetch('/api/interviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: {
          name: candidate,
          position,
          date,
        },
        skills: skills.map(({ name, level }) => ({ name, level })),
      }),
    });
  };
  return (
    <>
      <Section title="Interview Information" subtitle="Interview and candidates basic information">
        <form action="#" method="POST">
          <Card>
            <CardBody>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <InputControl
                    value={candidate}
                    name="candidate"
                    autoComplete="name"
                    label="Candidate"
                    onInput={text => setCandidate(text)}/>
                </div>
                <div className="col-span-6">
                  <InputControl name="position" label="Position" onInput={(position => setPosition(position))}
                                value={position}/>
                </div>
                <div className="col-span-6">
                  <InputControl
                    value={date}
                    name="date"
                    type="date"
                    label="Date"
                    onInput={text => setDate(text)}/>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </CardFooter>
          </Card>
        </form>
      </Section>
      <SectionSeparator/>
      <InterviewSkillsSection skills={skills} setSkills={setSkills}/>
      <SectionSeparator/>
      <Section title="Notes">
        <Card>
          <CardBody>
            <textarea
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              name="notes" id="notes" cols={30} rows={10}></textarea>
          </CardBody>
        </Card>
      </Section>
    </>
  );
};

export default InterviewEdit;
