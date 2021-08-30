import { openDB } from 'idb'
import { Customer } from './models'

const DATABASE_NAME = 'DEMO DB'

initDB().then(()=>{
    console.log("Init database done! ",DATABASE_NAME)
})

export async function deleteCustomer(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    await db.delete("customers",id);
}

export async function getCustomer(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    const customer = await db.get('customers',id)
    console.log("i am getting the customer "+ customer)
    return customer;
}

export async function getAllCustomers() {
    const db = await openDB(DATABASE_NAME, 1);
    var cursor = await db.transaction("customers").objectStore("customers").
         
    openCursor();
    var customers = []; //init an empty array
    //while there are customers left
    while (cursor) {
        customers.push(cursor.value); //add the new customer to the result
        cursor = await cursor.continue(); //move to the next customer
    }
    return customers;
}

export async function  insertCustomer(customer:Customer){
    const db = await openDB(DATABASE_NAME, 1)
    const tx = db.transaction('customers', 'readwrite');
    //store means table
    const store = tx.objectStore('customers');
    await store.put(customer)
    console.log("insertion done!")
}

//if database has not created, it will create a new one
async function initDB(){
    const db = await openDB(DATABASE_NAME,1,{
        upgrade(db){
            // Create a store of objects
            const store = db.createObjectStore('customers', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        }
    })
}