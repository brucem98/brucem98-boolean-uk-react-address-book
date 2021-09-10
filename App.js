import { useEffect, useState } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);

  const [contactToEdit, setContactToEdit] = useState(null);

  // [TODO] Write a useEffect to fetch contacts here...
  useEffect(() => {
    fetch(`http://localhost:3030/contacts`)
      .then((res) => res.json())
      .then((contactsData) => setContacts(contactsData));

    //setContacts since it's working with the state object
  }, []);
  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        setContactToEdit={setContactToEdit}
      />
      <main>
        {!hideForm && (
          <CreateContactForm contacts={contacts} setContacts={setContacts} />
        )}
      </main>
    </>
  );
}
