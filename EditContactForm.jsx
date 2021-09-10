import { useEffect, useState } from "react";

function EditContactForm(props) {
  console.log("Inside CreateUserForm (props): ", props);

  const { contacts, setContacts } = props;

  // [TODO] Write form handlers here and POST requests here...

  // // Method Two: Dynamic
  // const [contactInputs, setContactInputs] = useState({
  //   firstName: "",
  //   lastName: "",
  //   blockContact: false
  // });

  // Method One: Simple but tedious

  //Contact State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [blockContact, setBlockContact] = useState(false);

  // Address State
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");

  console.log("CreateContactForm State: ", {
    contact: {
      firstName,
      lastName
      // blockContact
    },
    address: { street, city, postCode }
  });

  // Form Handlers

  const handleSubmit = (event) => {
    event.preventDefault();

    // const contactToCreate = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   blockContact: blockContact
    // };

    // you neeed to create the address first because it will give us an ID which we need for the contacts
    const addressToCreate = {
      street: street,
      city: city,
      postCode: postCode
    };

    // console.log("Inside handleSubmit: ", contactToCreate, addressToCreate);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addressToCreate)
    };

    fetch("http://localhost:3030/addresses", fetchOptions)
      .then((res) => res.json())
      .then((newAddress) => {
        console.log("Inside addresses POST request", newAddress);

        const contactToCreate = {
          firstName,
          lastName,
          blockContact,
          addressId: newAddress.id
        };

        console.log("contact to create: ", contactToCreate);

        // Ready to write our next post request in here...

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactToCreate)
        };

        fetch("http://localhost:3030/contacts", fetchOptions)
          .then((res) => res.json())
          .then((newContact) => {
            console.log("contacts POST request: ", newContact);

            const contactToAdd = {
              ...newContact,
              adress: newAddress
            };
            console.log("contact to add: ", contactToAdd);

            // setContacts([...contacts, contactToAdd]);
          });
      });
  };
  const handleFirstName = (event) => setFirstName(event.target.value);

  const handleLastName = (event) => setLastName(event.target.value);

  const handleBlockCheckbox = (event) => setBlockContact(event.target.checked);

  const handleStreet = (event) => setStreet(event.target.value);

  const handleCity = (event) => setCity(event.target.value);

  const handlePostCode = (event) => setPostCode(event.target.value);

  return (
    <form
      onSubmit={handleSubmit}
      className="form-stack light-shadow center contact-form"
    >
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="first-name-input"
        type="text"
        onChange={handleFirstName}
      />
      <label htmlFor="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="last-name-input"
        type="text"
        onChange={handleLastName}
      />
      <label htmlFor="street-input">Street:</label>
      <input
        id="street-input"
        name="street-input"
        type="text"
        onChange={handleStreet}
      />
      <label htmlFor="city-input">City:</label>
      <input
        id="city-input"
        name="city-input"
        type="text"
        onChange={handleCity}
      />
      <label htmlFor="post-code-input">Post Code:</label>
      <input
        id="post-code-input"
        name="post-code-input"
        type="text"
        onChange={handleBlockCheckbox}
      />
      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="block-checkbox"
          type="checkbox"
          onChange={handlePostCode}
        />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default EditContactForm;
