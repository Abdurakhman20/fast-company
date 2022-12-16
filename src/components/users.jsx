import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };
  const renderPhrase = (num) => {
    const lastNum = num % 10;
    if (num > 4 && num < 15) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastNum) >= 0) return "человека тусанут";
    if (lastNum === 1) return "человек тусанет";
    return "человек тусанет";
  };
  return (
    <>
      <h2>
        <span className={`badge bg-${users.length > 0 ? "primary" : "danger"}`}>
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((arrItem) => {
              return (
                <tr key={arrItem._id}>
                  <td>{arrItem.name}</td>
                  <td>
                    {arrItem.qualities.map((item) => (
                      <span
                        className={`badge m-1 bg-${item.color}`}
                        key={item._id}
                      >
                        {item.name}
                      </span>
                    ))}
                  </td>
                  <td>{arrItem.profession.name}</td>
                  <td>{arrItem.completedMeetings}</td>
                  <td>{arrItem.rate}</td>
                  <td>
                    <button
                      className="btn bg-danger"
                      onClick={() => handleDelete(arrItem._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default Users;
