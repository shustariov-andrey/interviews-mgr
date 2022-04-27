import { SearchIcon } from '@heroicons/react/solid';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

interface Profile {
  id: string;
  name: string;
  position: string;
  date: string;
  score: number;
}

const Home: NextPage<{profiles: Profile[]}> = ({ profiles }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500"></SearchIcon>
            </div>
            <input type="search" onInput={(ev) => setSearchTerm((ev.target as HTMLInputElement).value)} id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
          </tr>
          </thead>
          <tbody>
          {filteredProfiles.map(profile =>
            <tr
              key={profile.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {profile.name}
              </td>
              <td className="px-6 py-4">
                {profile.position}
              </td>
              <td className="px-6 py-4">
                {profile.date}
              </td>
              <td className="px-6 py-4">
                {profile.score}
              </td>
            </tr>
          )}

          </tbody>
        </table>
      </div>
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async () => {
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
      profiles,
    },
  };
};

export default Home;
