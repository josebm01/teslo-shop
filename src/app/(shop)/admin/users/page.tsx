// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';

import { redirect } from 'next/navigation';
import { UserTable } from './ui/UserTable';

export default async function pageUsers() {

  const { ok, users = [] } = await getPaginatedUsers()

  if ( !ok ) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UserTable users={users} />
        <Pagination totalPages={3} />
      </div>
    </>
  );
}