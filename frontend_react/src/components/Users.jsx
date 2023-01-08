import { useQuery, useMutation } from "@apollo/client";
//internal
import UserRow from "./UserRow";
import { GET_USERS, ADD_USER } from "../graphql_network/user";

function Users() {
  const { loading, error, data: allUsersData } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER, {
    variables: { name: "zeina", email: "elzeian@hotmail.com", phone: "78822228" },
    update(cache, { data: { addUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: [...users, addUser] },
      });
    },
  });

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <header>
      <h1>Users:</h1>
      <button onClick={addUser}>Add Random User</button>
      <hr />
      <table className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allUsersData.users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </header>
  );
}

export default Users;
