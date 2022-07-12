import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import TableHead from "./components/TableHead";
const App = () => {
  
  const formFields = {
    fullName: "",
    phoneNumber: "",
    email: "",
  }

  const [contacts, setContacts] = useState(data);

  const [addFormData, setAddFormData] = useState(formFields);

  const [editFormData, setEditFormData] = useState(formFields);

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [newContact, ...contacts];
    setContacts(newContacts);
    event.target.reset();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...contacts].sort((a, b) => {
       return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
         numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
       );
      });
      setContacts(sorted);
     }
  };


  const columns = [
    { label: "Name", accessor: "fullName"},
    { label: "Email address", accessor: "email"},
    { label: "Phone number", accessor: "phoneNumber"}
   ];

  return (
    <div className="app-container">
      <div className="header-box">
        <div className="logo">
          <div className="first-part"></div>
          <div className="second-part"></div>
        </div>
        <div className="logo-title"> lord Software</div>
      </div>
      <div className="form-container">
      <h1>List of participants</h1>
      <form className="input_form" onSubmit={handleAddFormSubmit}>
        <div className="form-elements">
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Full name"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="E-mail address"
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="phoneNumber"
          required="required"
          placeholder="Phone number"
          onChange={handleAddFormChange}
        />
        </div>
        
        <div className="form-actions">
          <button className="add_btn" type="submit">Add New</button>
        </div>    
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <TableHead columns={columns} handleSorting={handleSorting}/>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
   </div>
  </div>
  );
};

export default App;
