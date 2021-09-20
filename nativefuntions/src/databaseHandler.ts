import  {openDB} from 'idb'

const DATABASE_NAME = 'TCH1906_PicDB'

initDB().then(()=>{
    console.log(DATABASE_NAME + ' created or opened!')
})

export async function savePicture(picture:any) {
    const db = await openDB(DATABASE_NAME, 1)
    db.put("UserPics",picture)
    console.log("1 picture inserted!")
}

//if database has not created, it will create a new one
async function initDB(){
    const db = await openDB(DATABASE_NAME,1,{
        upgrade(db){
            // Create a store of objecconst db = openDB()ts
            const store = db.createObjectStore('UserPics', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            });
        }
    })
}