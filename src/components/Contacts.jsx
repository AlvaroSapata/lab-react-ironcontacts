import { useState } from "react";
import allContacts from "../contacts.json";

// Function to Display 5 Contacts
function Contacts() {
  //   const contactList = allContacts.slice(0, 5);
  const [contactList, setContactList] = useState(allContacts.slice(0, 5));

  const addRandomContact = () => {
    //* Clausula de guardia
    if (allContacts.length === contactList.length) {
      console.log("No more contacts to add");
      return;
    }

    const indexRandom = Math.floor(Math.random() * allContacts.length);
    const randomContact = allContacts[indexRandom];
    console.log(randomContact);

    //* Clausula de duplicados
    let isDuplicated = false;
    contactList.forEach((eachContact) => {
      if (eachContact.id === randomContact.id) {
        isDuplicated = true;
      }
    });

    if (isDuplicated === true) {
      console.log("Already in the list");
      addRandomContact();
      return;
    }

    const clonedContacts = JSON.parse(JSON.stringify(contactList));
    clonedContacts.push(randomContact);
    setContactList(clonedContacts);
  };

  const sortContactByName = () => {
    console.log("sort by name");
    const clonedContacts = JSON.parse(JSON.stringify(contactList));
    const sortedContactsByName = clonedContacts.sort((contact2, contact1) => {
      return contact2.name > contact1.name ? 1 : -1;
    });
    setContactList(sortedContactsByName);
  };

  const sortContactByPopularity = () => {
    console.log("sort by popularity");
    const clonedContacts = JSON.parse(JSON.stringify(contactList));
    const sortedContactsByPopularity = clonedContacts.sort(
      (contact2, contact1) => {
        return contact2.popularity > contact1.popularity ? -1 : 1;
      }
    );
    setContactList(sortedContactsByPopularity);
  };

  const deleteContact = (index) => {
    console.log("Delete the contact", index);
    const clonedContacts = JSON.parse(JSON.stringify(contactList));
    clonedContacts.splice(index, 1);
    setContactList(clonedContacts);
  };

  return (
    <div>
      <button onClick={addRandomContact}>Add Contact</button>
      <button onClick={sortContactByName}>Sort by Name</button>
      <button onClick={sortContactByPopularity}>Sort by Popularity</button>
      {contactList.map((eachContact, index) => {
        // console.log(contactList);
        return (
          <div key={eachContact.id}>
            <table>
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Popularity</th>
                  <th>Won an Oscar</th>
                  <th>Won an Emmy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src={eachContact.pictureUrl}
                      alt="imagen"
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{eachContact.name}</td>
                  <td>{eachContact.popularity}</td>
                  <td>{eachContact.wonOscar ? "✅" : "❌"}</td>
                  <td>{eachContact.wonEmmy ? "✅" : "❌"}</td>
                  <td><button onClick={() => deleteContact(index)}>Delete contact</button></td>
                </tr>
              </tbody>
            </table>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Contacts;
