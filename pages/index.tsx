import { PlusIcon, SearchIcon } from '@heroicons/react/solid';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../components/button';
import Header from '../components/layout/header';
import Table, { TableProps } from '../components/table';
import { Profile } from '../lib/domain/profile';
import { InterviewService } from '../lib/services/interview.service';

interface ProfileWithScore extends Profile {
  id: string;
  score: number;
}

const Home: NextPage<{profiles: ProfileWithScore[]}> = ({ profiles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.position.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const table: TableProps<ProfileWithScore> = {
    columns: [
      'name',
      'position',
      'date',
      'score'
    ],
    headers: {
      name: 'Name',
      position: 'Position',
      date: 'Date',
      score: 'Avg. Score',
    },
    data: filteredProfiles,
    onRowClick: (item) => {
      router.push(`/interview/${item.id}`)
    }
  };

  return (
    <>
      <Header>
        <Link href="/interview/new" passHref>
          <Button theme="indigo">
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
            Add Interview
          </Button>
        </Link>
      </Header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="p-4">
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-gray-500"></SearchIcon>
                </div>
                <input type="search" onInput={(ev) => setSearchTerm((ev.target as HTMLInputElement).value)}
                       id="table-search"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search for items"/>
              </div>
            </div>
            <Table columns={table.columns} data={table.data} headers={table.headers} onRowClick={table.onRowClick}></Table>
          </div>
        </div>
      </div>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const interviews = await InterviewService.getInstance().findAll(session);

  return {
    props: {
      session,
      profiles: interviews.map(({ _id: id, profile, skills }) => ({
        id,
        ...profile,
        score: (skills
          .map(({ level }) => level)
          .reduce((total, cur) => total + cur, 0) / skills.length).toFixed(2),
      })),
    },
  };
};

export default Home;
