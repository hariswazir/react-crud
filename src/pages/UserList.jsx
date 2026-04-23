import { useEffect, useState } from "react";
import api from "../api/axios";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 1. Data Fetch Karne ka logic
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const deleteUser = async (id) => {
   
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        
        setUsers(users.filter((user) => user.id !== id));
        
        console.log("User deleted successfully");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete user!");
      }
    }
  };

  
  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button 
        icon="pi pi-pencil" 
        className="p-button-sm p-button-warning" 
        onClick={() => navigate(`/edit/${rowData.id}`)}
      />
      <Button 
        icon="pi pi-trash" 
        className="p-button-sm p-button-danger" 
        onClick={() => deleteUser(rowData.id)} 
      />
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">Users List</h1>
        
        <Button 
          label="Add User" 
          icon="pi pi-plus" 
          size="small" 
          className="p-button-success"
          onClick={() => navigate("/add")}
        />
      </div>

      <DataTable value={users} stripedRows paginator rows={5} size="small" filterDisplay="row">
        <Column field="name" header="Name" sortable filter filterPlaceholder="search by Name" />
        <Column field="username" header="Username" sortable filter filterPlaceholder="search by Username" />
        <Column field="email" header="Email" sortable filter filterPlaceholder="search by Email" />
        <Column field="age" header="Age" sortable filter filterPlaceholder="search by Age" />
        <Column header="Action" body={actionTemplate} style={{ width: "13%" }} />
      </DataTable>
    </div>
  );
}