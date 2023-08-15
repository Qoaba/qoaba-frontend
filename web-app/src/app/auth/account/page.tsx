"use client";

import { useSession } from 'next-auth/react';

export const Account = () => {
    const { data: session } = useSession();

    return (
        
      <div>
        <h1>Account Page</h1>
        {session ? (
          <div>
            Signed in as:
            <br />
            Name: {session.user?.name} <br />
            Email: {session.user?.email} <br />
          </div>
        ) : (
          <div>Not signed in</div>
        )}
      </div>
    );
};

export default Account;
