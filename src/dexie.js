import Dexie from 'dexie';

export const db = new Dexie('instagram');

db.version(1).stores({
    bio: ',name,about', // The 1st comma is incase you want to add more objects. like profilePhoto
    gallery: '++id, url', // We are adding id value bcos we need it to delete particular photo
})