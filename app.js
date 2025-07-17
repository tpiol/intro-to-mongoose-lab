/*------------------------------- Modules -------------------------------*/
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

/*------------------------------- Query Functions -------------------------------*/
let choice;

const printMainMenu = () => {
    console.log('Welcome to the CRM')
    console.log()
    console.log('What would you like to do?')
    console.log()
    console.log('. 1. Create a customer')
    console.log('. 2. View all customers')
    console.log('. 3. Update a customer')
    console.log('. 4. Delete a customer')
    console.log('. 5. quit')
}

const takeUserInput = () => {
    console.log('Which option would you like to choose?')
    return prompt();
}



const createCustomer = async (name, age) => {
    const customerData = {
        name: name,
        age: age,
    };
    const customer = await Customer.create(customerData);
    console.log('New Customer:', customer);
};

const viewCustomer = async () => {
    const customers = await Customer.find({})
    console.log('All Customers', customers);
}

const updateCustomer = async () => {
    const id = prompt(`Please enter ID of customer.`)
    const newName = prompt("What is the customer's new name?")
    const newAge = prompt("What is the customer's new age?")
    const updatedCustomer = Customer.findByIdAndUpdate(id, 
        { name: newName }, 
       { age: newAge }
    );
    console.log(`The updated customer is: $(getCustomer)`)
};

/*------------------------------- Main App -------------------------------*/
const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MonoDb')


    printMainMenu();
    choice = takeUserInput();
    if (choice === '1') {
        const customerName = prompt("What is the customer's name?");
        const customerAge = parseInt(prompt("What is the customer's age?"))

        await createCustomer(customerName, customerAge);
    } else if (choice === '2') {
        await viewCustomer();
    } else if (choice === '3') {
        await updateCustomer();
    }

    await mongoose.disconnect();
    console.log('You are now disconnecting from Mongoose');

};

connectToDatabase();

// while(choice !== '5') {
// printMainMenu();
// takeUserInput();
// }
// console.log('Goodbye');

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);

