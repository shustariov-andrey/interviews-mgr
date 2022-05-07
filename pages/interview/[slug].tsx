import { Types } from 'mongoose';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Card from '../../components/card/card';
import CardBody from '../../components/card/card-body';
import InterviewProfileSection from '../../components/interview/interview-profile-section';
import InterviewSkillsSection from '../../components/interview/interview-skills-section';
import Section from '../../components/section/section';
import SectionSeparator from '../../components/section/section-separator';
import { ApiUtils } from '../../lib/api/api-utils';
import { Interview } from '../../lib/domain/interview';
import { Profile } from '../../lib/domain/profile';
import { Skill } from '../../lib/domain/skill';
import { InterviewService } from '../../lib/services/interview.service';

interface InterviewEditProps {
  interview: Interview;
}

const InterviewEdit: NextPage<InterviewEditProps> = ({ interview }) => {
  const [profile, setProfile] = useState<Profile>(interview.profile);
  const [skills, setSkills] = useState<Skill[]>(interview.skills);
  const [notes, setNotes] = useState(interview.notes);
  const router = useRouter();

  const onSubmit: () => Promise<void> = async () => {
    const mappedInterview = {
      _id: interview._id,
      profile,
      skills: skills.filter(({ name, level }) => name && level),
      notes,
      ownerId: interview.ownerId,
    };
    if (interview._id) {
      const updatedItem = await ApiUtils.put(`/api/interviews/${interview._id}`, mappedInterview);
      setProfile(updatedItem.profile);
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
  };

  return (
    <>
      <InterviewProfileSection profile={profile} setProfile={setProfile} saveInterview={onSubmit}
                               deleteInterview={deleteInterview}/>
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
