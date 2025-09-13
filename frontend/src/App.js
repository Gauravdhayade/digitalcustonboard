import React from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UploadDocs from "./components/UploadDocs";

function App() {
  const refreshPage = () => window.location.reload();

  return (
    <div className="App p-4">
      <h1>User Profile Management</h1>
      <UserForm onSave={refreshPage} />
      <UserList />
      <UploadDocs />
    </div>
  );
}

export default App;
