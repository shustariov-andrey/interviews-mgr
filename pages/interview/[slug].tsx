import { Types } from 'mongoose';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Card from '../../components/card/card';
import CardBody from '../../components/card/card-body';
import CardFooter from '../../components/card/card-footer';
import InputControl from '../../components/form/input-control';
import InterviewSkillsSection from '../../components/interview/interview-skills-section';
import Section from '../../components/section/section';
import SectionSeparator from '../../components/section/section-separator';
import { ApiUtils } from '../../lib/api/api-utils';
import { Interview } from '../../lib/domain/interview';
import { Skill } from '../../lib/domain/skill';
import { InterviewService } from '../../lib/services/interview.service';

interface InterviewEditProps {
  interview: Interview;
}

const InterviewEdit: NextPage<InterviewEditProps> = ({ interview }) => {
  const [candidate, setCandidate] = useState(interview.profile.name);
  const [position, setPosition] = useState(interview.profile.position);
  const [date, setDate] = useState(interview.profile.date);
  const [skills, setSkills] = useState<Skill[]>(interview.skills);
  const [notes, setNotes] = useState(interview.notes);
  const router = useRouter();

  const onSubmit: () => Promise<void> = async () => {
    const mappedInterview = {
      _id: interview._id,
      profile: {
        name: candidate,
        position,
        date,
      },
      skills: skills.filter(({name, level}) => name && level),
      notes,
      ownerId: interview.ownerId
    }
    if (interview._id) {
      const updatedItem = await ApiUtils.put(`/api/interviews/${interview._id}`, mappedInterview);
      setCandidate(updatedItem.profile.name);
      setPosition(updatedItem.profile.position);
      setDate(updatedItem.profile.date);
      setSkills(updatedItem.skills);
      setNotes(updatedItem.notes);
    } else {
      const newItem = await ApiUtils.post<Interview>('/api/interviews', mappedInterview);
      await router.push(`/interview/${newItem._id}`);
    }
  };

  const deleteInterview: () => Promise<void> = async () => {
    await ApiUtils.delete(`/api/interviews/${interview._id}`);
    await router.push('/');
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
                onClick={deleteInterview}
                className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
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
              name="notes" id="notes" cols={30} rows={10} value={notes}
              onInput={ev => setNotes((ev.target as HTMLInputElement).value)}></textarea>
          </CardBody>
        </Card>
      </Section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<InterviewEditProps, {slug: string}> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const interviewId = context.params?.slug;

  if (interviewId === 'new') {
    return {
      props: {
        interview: createEmptyInterview(session.id as string),
      },
    };
  }
  if (Types.ObjectId.isValid(interviewId!)) {
    const interview = await InterviewService.getInstance().findById(session, interviewId as string);
    if (interview) {
      return {
        props: {
          interview,
        },
      };
    }
  }
  return {
    notFound: true,
  };
};

function createEmptyInterview(ownerId: string) {
  return {
    profile: {
      name: '',
      date: new Date().toISOString(),
      position: '',
    },
    skills: [],
    notes: '',
    ownerId,
  };
}

export default InterviewEdit;
