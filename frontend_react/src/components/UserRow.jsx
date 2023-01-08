import { useMutation } from "@apollo/client";
//internal
import { DELETE_USER, GET_USERS } from "../graphql_network/user";

const ClientRow = ({ user }) => {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: user.id },
    //TO UPDATE DATA INSTANTLY WE HAVE 2 OPTIONS:
    //1: By Refetching all data from DB
    // refetchQueries: [{ query: GET_USERS }],
    //-----------------------------
    //2: Update Cache Instantly //BETTER
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });

      cache.writeQuery({
        query: GET_USERS,
        data: { users: users.filter((user) => user.id !== deleteUser.id) },
      });
    },
  });

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <button onClick={deleteUser}>DELETE</button>
      </td>
    </tr>
  );
};

export default ClientRow;
