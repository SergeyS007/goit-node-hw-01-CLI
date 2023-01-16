const logger = require("./contacts");

// logger.listContacts();
// logger.getContactById("5");
// logger.removeContact("581779ed-d682-49de-8d7b-013973eaf715");
// logger.addContact("aa", "aa", "aa");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await logger.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await logger.getContactById(id);
      console.log("contact: ", contact);
      if (!contact) {
        console.error(`Contact with id ${id} not found`);
      }
      break;

    case "add":
      const contactsAdded = await logger.addContact(name, email, phone);
      console.table(contactsAdded);
      break;

    case "remove":
      const contactDeleted = await logger.removeContact(id);
      console.table(contactDeleted);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
