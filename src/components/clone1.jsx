import { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);


  useEffect(() => {
    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`)
    .then(response => response.json())
      .then(data => {
        setUsers(prevUsers => [...prevUsers, users]);
        setIsLoading(false);
      })
    .catch(error => console.error(error));
}, [page,size]);

  console.log(users)
const handleScroll = e => {
  const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
  if (scrollHeight - scrollTop === clientHeight && !isLoading) {
    setPage(prevPage => prevPage + 1);
    setSize(prevSize => prevSize+10)
  }
};


  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="users-container">
        {users.list.map(user =>(
            <div key={user.id} className="user-card">
              <a key={user.id} href={`/user/${user.id}`} >
                <img src={user.imageUrl} alt={user.name} />
                <h1>{user.prefix} {user.name} {user.lastName} </h1>
                <p>{user.title}</p>
              </a>
            </div>
        ))}
    </div>
  );
}

export default UsersList;
