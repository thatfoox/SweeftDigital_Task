import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalPages, setTotalPages] = useState(0);
  const loader = useRef(null);

  useEffect(() => {

    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${pageSize}`)
      .then(response => response.json())
      .then(data => {
        setUsers([...users, ...data.list]);
        setTotalPages(data.pagination.total);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, [page, pageSize]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    console.log("2")
    if (target.isIntersecting) {
      console.log("1")
      setPage(prevPage => prevPage + 1);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(users)
  console.log(users.id)
  return (
    <div className="users-container">
      {users.map(user =>(
        <div key={uuidv4()} className="user-card">
          <a key={uuidv4()} href={`/user/${user.id}`} >
            <img src={user.imageUrl+"?param="+user.id} alt={user.name} />
            <h1>{user.prefix} {user.name} {user.lastName} </h1>
            <p>{user.title}</p>
          </a>
        </div>
      ))}
      {users.length < totalPages &&
        <div ref={loader}>
          <p>Loading more users...</p>
        </div>
      }
    </div>
  );
}

export default UsersList;