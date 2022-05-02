import { PlusIcon, SearchIcon } from '@heroicons/react/solid';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import Header from '../components/layout/header';
import Table, { TableProps } from '../components/table';

interface Profile {
  id: string;
  name: string;
  position: string;
  date: string;
  score: number;
}

const Home: NextPage<{profiles: Profile[]}> = ({ profiles }) => {
  const { data: session } = useSession();
  if (!session) {
  }
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.position.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const table: TableProps<Profile> = {
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
      score: 'Score'
    },
    data: filteredProfiles,
    keyProp: 'id',
  }

  return (
    <>
      <Header>
        <Link href="/interview/edit" passHref>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Interview
          </button>
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
            <Table columns={table.columns} data={table.data} headers={table.headers} keyProp={table.keyProp}></Table>
          </div>
        </div>
      </div>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const profiles = [{
    id: '1',
    name: 'Andrey Belozor',
    position: 'Front-End Angular/Ionic',
    date: '2020-09-01',
    score: 2.22,
  }, {
    id: '2',
    name: 'Vladyslav Shumik',
    position: 'Front-End Angular/Ionic',
    date: '2020-09-02',
    score: 3.38,
  }, {
    id: '3',
    name: 'Liudmyla Demenkova',
    position: 'Front-End Angular/Ionic',
    date: '2020-09-04',
    score: 2.67,
  }, {
    id: '4',
    name: 'Viacheslav Hromoi',
    position: 'Front-End Angular/Ionic',
    date: '2020-09-11',
    score: 3.38,
  }, {
    id: '5',
    name: 'Tymoshyk Dmitry',
    position: 'NodeJs Developer',
    date: '2020-12-08',
    score: 2.4,
  }];
  return {
    props: {
      session,
      profiles,
    },
  };
};

export default Home;
