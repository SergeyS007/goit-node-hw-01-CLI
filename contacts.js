const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const filteredContacts = contacts.filter((_, ind) => ind !== index);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return contacts[index];
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = uuidv4();
    const data = { id: id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
