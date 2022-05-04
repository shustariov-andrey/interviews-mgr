import { PlusIcon } from '@heroicons/react/solid';
import React from 'react';
import { Skill } from '../../lib/domain/skill';
import Card from '../card/card';
import CardBody from '../card/card-body';
import InputControl from '../form/input-control';
import ScoreControl from '../form/score-control';
import Section from '../section/section';

interface InterviewSkillsSectionProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

const InterviewSkillsSection: React.FC<InterviewSkillsSectionProps> = ({ skills, setSkills }) => {
  const addSkill = (): void => {
    setSkills([...skills, { name: 'New Skill', level: 0 }]);
  };

  const updateSkillValue = (index: number, level: number): void => {
    const newSkills = [...skills];
    newSkills[index] = {
      ...newSkills[index],
      level,
    };
    setSkills(newSkills);
  };

  const updateSkillName = (index: number, name: string): void => {
    const newSkills = [...skills];
    newSkills[index] = {
      ...newSkills[index],
      name,
    };
    setSkills(newSkills);
  };
  return (
    <>
      <Section title="Skills" subtitle="Candidate skills and scores">
        <Card>
          <CardBody>
            <div className="grid grid-cols-2 gap-6">
              {
                skills.map((skill, index) =>
                  <React.Fragment key={index}>
                    <InputControl value={skill.name} name={'skill' + index}
                                  onInput={name => updateSkillName(index, name)}/>
                    <ScoreControl value={skill.level} onChange={value => updateSkillValue(index, value)}/>
                  </React.Fragment>,
                )
              }
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex w-full items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="w-5 h-5 text-white"></PlusIcon>
                  &nbsp;
                  Add Skill
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Section>
    </>
  );
};

export default InterviewSkillsSection;
