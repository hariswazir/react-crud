import { useEffect, useState } from "react";
import api from "../api/axios";
import { PrimeReactProvider } from 'primereact/api';
import { DataTable } from "primereact/datatable";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Syntax Fix: Function ko effect ke andar define kiya taake cascading render na ho
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <div>
      <h2>Users List</h2>
      <DataTable value={users} showGridlines tableStyle={{ minWidth: '50rem' }}>
    <Column field="code" header="Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
    </div>
  );
}