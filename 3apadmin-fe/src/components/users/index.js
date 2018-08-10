// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  users: Array<HarvestUser>
};

const Users = ({ users }: Props) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>
        <Link to={'/overtime/' + user.id}>
          {user.firstName} {user.lastName}
        </Link>
      </li>
    ))}
  </ul>
);

export default Users;
