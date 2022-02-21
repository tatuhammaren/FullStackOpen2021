import React from 'react';
const SingleUserPage = ({ user }) => {

  if (!user) return null;

  const blogCount = user.blogs.length;


  const userHasBlogs = () => {
    return (
      <div>

        <p>got blogs: </p>
        <ul>
          {user.blogs.map(
            (b =>
              <li key={b.id}>
                <p>{b.title}</p>
              </li>
            )
          )}
        </ul>

      </div>
    );
  };

  const userHasNoBlogs = () => {
    return (
      <div>
              no blogs yet..
      </div>
    );
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        {blogCount >= 1
          ? userHasBlogs()
          : userHasNoBlogs()}

      </div>
    </div>

  );

};


export default SingleUserPage;