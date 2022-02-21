import React from 'react';
import { Link } from 'react-router-dom';






const UsersPage = ({ users }) => {
  console.log('HALOO TÄÄLLÄ OLLAAN!!!');
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>

          );

        })}
      </ul>

    </div>
  );
};

export default UsersPage;