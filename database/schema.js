import Realm from 'realm';

export const USER_SCHEMA = "User";

export const UserSchema = {
    name: USER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'string',
        firstName: {type: 'string', indexed: true},
        lastName: {type: 'string', indexed: false},
        phoneNumber: {type: 'string', indexed: false},
        emailAddress: {type: 'string', indexed: true},
        company: {type: 'string', indexed: true},
    }
};


const databaseOptions = {
    path: 'user.realm',
    schema: [UserSchema],
    schemaVersion: 2,
};

export const insertNewUser = newUserList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(USER_SCHEMA, newUserList);
            resolve(newUserList);
        })
    }).catch((error) => reject(error));
});

export const queryAllUsers = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allUsers = realm.objects(USER_SCHEMA);
        resolve(allUsers);
    }).catch((error) => {
        reject(error);
    }).then();
});

export default new Realm(databaseOptions);