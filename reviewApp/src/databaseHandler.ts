import { openDB } from 'idb'

const DATABASE_NAME = 'reviewApp1'

export async function getEmployees() {
    const db = await openDB(DATABASE_NAME, 1)
    return await db.getAll("employee")
}

export async function insertEmployee(emp:any) {
    const db = await openDB(DATABASE_NAME, 1)
    await db.put("employee",emp)
}


initDB().then(()=>{
    console.log("Database initialized!")
})

async function initDB() {
    const db = await openDB(DATABASE_NAME, 1, {
        upgrade(db) {
            const store = db.createObjectStore('employee', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        }
    })
}