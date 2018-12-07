import Realm from 'realm';

export const USER_SCHEMA = "User";

export const PROFILE_SCHEMA = "Profile";

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

export const ProfileSchema = {
    name: PROFILE_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'string',
        profileSubmitted:{type:'string'},
        linkedin: {type: 'string', indexed: false},
        instagram: {type: 'string', indexed: false},
        facebook: {type: 'string', indexed: false},
        emailAddress: {type: 'string', indexed: true},
    }
};


const userDatabaseOptions = {
    path: 'userList.realm',
    schema: [UserSchema],
    schemaVersion: 4,
};

const profileDatabaseOptions = {
    path: 'profileData.realm',
    schema: [ProfileSchema],
    schemaVersion: 2,
};

export const insertNewUser = newUserList => new Promise((resolve, reject) => {
    Realm.open(userDatabaseOptions).then(realm => {
        realm.write(() => {
            realm.create(USER_SCHEMA, newUserList);
            resolve(newUserList);
        })
    }).catch((error) => reject(error));
});

export const queryAllUsers = () => new Promise((resolve, reject) => {
    Realm.open(userDatabaseOptions).then(realm => {
        let allUsers = realm.objects(USER_SCHEMA);
        resolve(allUsers);
    }).catch((error) => {
        reject(error);
    }).then();
});

export const editUser = user => new Promise((resolve,reject)=>{
    Realm.open(userDatabaseOptions).then(realm=>{
        realm.write(()=>{
            let updatingUser = realm.objectForPrimaryKey(USER_SCHEMA,user.id);
            updatingUser.name=user.name;
            updatingUser.phoneNumber=user.phoneNumber;
            updatingUser.emailAddress=user.emailAddress;
            updatingUser.company=user.company;
            updatingUser.linkedin=user.linkedin;
            updatingUser.instagram=user.instagram;
            updatingUser.facebook= user.facebook;
            updatingUser.notes= user.notes;
            resolve();
        });
    }).catch(error=>reject(error));
});

export const deleteUser = user => new Promise((resolve, reject) => {
    Realm.open(userDatabaseOptions).then(realm => {
        realm.write(()=>{
            let deletingUser = realm.objectForPrimaryKey(USER_SCHEMA,user.id);
            realm.delete(deletingUser);
            resolve();
        });
    }).catch((error) => reject(error));
});


export const insertNewProfileInfo = profileInfo => new Promise((resolve, reject) => {
    Realm.open(profileDatabaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PROFILE_SCHEMA, profileInfo);
            resolve(profileInfo);
        })
    }).catch((error) => reject(error));
});

export const queryProfile = () => new Promise((resolve, reject) => {
    Realm.open(profileDatabaseOptions).then(realm => {
        let profileInfo = realm.objects(PROFILE_SCHEMA);
        resolve(profileInfo);
    }).catch((error) => {
        reject(error);
    }).then();
});

export const editProfileInfo = info => new Promise((resolve,reject)=>{
    Realm.open(profileDatabaseOptions).then(realm=>{
        realm.write(()=>{
            let updatingInfo = realm.objectForPrimaryKey(PROFILE_SCHEMA,info.id);
            updatingInfo.emailAddress=info.emailAddress;
            updatingInfo.linkedin=info.linkedin;
            updatingInfo.instagram=info.instagram;
            updatingInfo.facebook= info.facebook;
            resolve();
        });
    }).catch(error=>reject(error));
});



export const realmUser= new Realm(userDatabaseOptions);
export const realmProfile= new Realm(profileDatabaseOptions);