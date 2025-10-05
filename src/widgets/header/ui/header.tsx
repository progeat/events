import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  const { data, status } = useSession();

  return (
    <header className="flex justify-between items-center">
      <Link href={'/'}>
        <Image src="/logo.jpg" alt="logo" height={50} width={150} />
      </Link>
      <nav className="flex items-center space-x-4">
        {status === 'loading' ? (
          <div>Loading...</div>
        ) : data ? (
          <div className="flex items-center space-x-4">
            <span>{data.user.name}</span>
            <button onClick={() => signOut()}>Выйти</button>
            <Link
              className="bg-green-500 hover:bg-green-700 px-4 rounded-md text-white"
              href={'/events/create'}
            >
              Создать событие
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button onClick={() => signIn()}>Войти</button>
          </div>
        )}
      </nav>
    </header>
  );
};
