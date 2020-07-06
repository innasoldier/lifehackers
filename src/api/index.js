import db from 'db'

// export const createUserRef = (uid) => db.doc('profiles/' + uid)

export const createRef = (collection, docId) => db.doc(`${collection}/` + docId)

export * from './services'
export * from './auth'
export * from './offers'
export * from './collaborations'
export * from './connection'