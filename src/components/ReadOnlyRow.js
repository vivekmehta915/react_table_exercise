import React from "react";
import { FaTrash } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.email}</td>
      <td>{contact.phoneNumber}</td>
      <td>
        <button
          type="button" className="btn"
          onClick={(event) => handleEditClick(event, contact)}
        >
          <FaPencilAlt />
        </button>
        <button type="button" className="btn" onClick={() => handleDeleteClick(contact.id)}>
        <FaTrash />
        </button>
        <div>
    </div>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
