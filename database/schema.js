import Realm from 'realm';

export const USER_SCHEMA = "User";

export const UserSchema = {
    name: USER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: {type: 'string', indexed: false},
        phoneNumber: {type: 'string', indexed: false},
        emailAddress: {type: 'string', indexed: true},
        company: {type: 'string', indexed: true},
        linkedin: {type: 'string', indexed: false},
        instagram: {type: 'string', indexed: false},
        facebook: {type: 'string', indexed: false},
        notes: {type: 'string', indexed: false},
    }
};


const databaseOptions = {
    path: 'userList.realm',
    schema: [UserSchema],
    schemaVersion: 4,
};

export const queryAllUsers = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allUsers = realm.objects(USER_SCHEMA);
        resolve(allUsers);
    }).catch((error) => {
        reject(error);
    }).then();
});

export const insertNewUser = newUserList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(USER_SCHEMA, newUserList);
            resolve(newUserList);
        })
    }).catch((error) => reject(error));
});

export const editUserName = user => new Promise((reolve,reject)=>{
    Realm.open(databaseOptions).then(realm=>{
        realm.write(()=>{
           let updatingUser = realm.objectForPrimaryKey(USER_SCHEMA,user.id);

        });
    })
});



export default new Realm(databaseOptions);