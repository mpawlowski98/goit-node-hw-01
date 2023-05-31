const fs = require("fs");
const path = require("path");

const contactPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactPath, (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactPath, (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.log("Contact found:");
      console.table(contact);
    } else {
      console.log("Contact not found");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactPath, (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }
    const contacts = JSON.parse(data);
    const updateContact = contacts.filter((c) => c.id !== contactId);
    fs.writeFile(contactPath, JSON.stringify(updateContact), (error) => {
      if (error) {
        console.error("Error removing contact:", error);
        return;
      }
      console.log("Contact removed successfully");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactPath, (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    const updateContacts = [...contacts, newContact];
    fs.writeFile(contactPath, JSON.stringify(updateContacts), (error) => {
      if (error) {
        console.error("Error adding contacts:", error);
        return;
      }
      console.log("Contact added successfully.");
    });
  });
}

module.exports = {
  listContacts,
  removeContact,
  getContactById,
  addContact,
};
