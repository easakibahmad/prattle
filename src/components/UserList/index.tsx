import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

interface User {
  uid: string;
  email: string;
}

const UserList: React.FC<{ onUserSelect: (user: User) => void }> = ({
  onUserSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const userList: User[] = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        email: doc.data().email,
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            {user.email}
            <button onClick={() => onUserSelect(user)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
