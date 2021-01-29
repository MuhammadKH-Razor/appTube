// import firebase, { database } from '../../firebase/fire';

// export const valueChange = () => (dispatch) => {
//     setTimeout(() => {
//         return dispatch ({type: 'VALUE_CHANGE', value: 'huda'})
//     }, 2000)
// }


// // AUTHENTICATION FIREBASE

// export const registerFirebase = (data) => (dispatch) => {
//         dispatch({type: 'LOADING_CHANGE', value: true})
//         return (
//             firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
//             .then(response => {
//                 console.log('success :' ,response)
//                 const dataUser = {
//                     email: response.user.email,
//                     uid: response.user.uid,
//                     emailVerified: response.user.emailVerified
//                 }
//                 setTimeout(() => {
//                     dispatch({type: 'LOADING_CHANGE', value: false})
//                     dispatch({type: 'LOGIN_CHANGE', value: true})
//                     dispatch({type: 'USER_CHANGE', value: dataUser})
//                 }, 2000)
//             })
//             .catch((error) => {
//                 console.log('failed: ', error.message)
//                 dispatch({type: 'LOADING_CHANGE', value: false})
//                 dispatch({type: 'LOGIN_CHANGE', value: false})
//             })
//         )
// }

// export const loginFirebase = (data) => (dispatch) => {

//     return new Promise((resolve, reject) => {

//     firebase.auth().signInWithEmailAndPassword(data.email, data.password)
//     .then(response => {
//         const dataUser = {
//             email: response.user.email,
//             uid: response.user.uid,
//             emailVerified: response.user.emailVerified,
//             refreshToken: response.user.refreshToken
//         }
//         resolve(dataUser)
//         console.log('success: ', response)
//     })
//     .catch((error) => {
//         reject(false)
//         console.log('failed: ', error.message);
//     })
//   }
// )
// }


// // ====================================================================== //


// // READ DATA
// export const getDataFirebase = (data) => (dispatch) => {
//     const getData = database.ref('/adds' + data);
    
//     return new Promise((resolve) => {
//         getData.on('value', function(snapshot) {
//         const array = [];
//             Object.keys(snapshot.val()).map(key => {
//                array.push({
//                    id: key,
//                    data: snapshot.val()[key]
//                })
//            })
//             dispatch({type: 'NOTES_CHANGE', value: array})
//             console.log('firebase: ', snapshot.val());
//         })
//     })
// }


// // ADD DATA
// export const addDataFirebase = (data) => (dispatch) => {
//     database.ref('/adds' + data.userId).push({
//         title: data.title,
//         content: data.content,
//         price: data.price,
//         date: data.date
//     })
// }


// // UPDATE DATA
// export const updateDataFirebase = (data) => (dispatch) => {
//     console.log('ini kah data: ', data.userId);
//     const updateData = database.ref(`/adds${data.userId}/${data.noteId}`);
    
//     return new Promise((resolve, reject) => {
//         updateData.set({
//             title: data.title,
//             content: data.content,
//             date: data.date,
//             price: data.price
//         }, (err) => {
//             if(err) {
//                 reject(false)
//             }else{
//                 resolve('berhasil')
//             }
//         })
//     })
// }


// // DELETE DATA

// export const deleteDataFirebase = (data) => (dispatch) => {
//     const delFirebase = database.ref(`/adds${data.userId}/${data.noteId}`);
//     return new Promise((resolve, reject) => {
//         delFirebase.remove();
//     })
// }



// ================== REGISTER / LOGIN GRAB SHOP




// export const registerGrab = (data) => (dispatch) => {
//     return new Promise((resolve, reject) => {
//         firebaseGrab.auth().createUserWithEmailAndPassword(data.email, data.password)
//         .then(response => {
//             console.log('register sukses :', response);
//             const dataUser1 = {
//                 email: response.user.email,
//                 uid: response.user.uid,
//                 emailVerified: response.user.emailVerified,
//                 nama: data.dataUser.nama,
//                 alamat: data.dataUser.alamat,
//                 nomer: data.dataUser.nomer,
//                 toko: data.dataUser.toko
//             }
//             resolve(dataUser1);
//             localStorage.setItem('registerData', JSON.stringify(dataUser1));
//         })
//         .catch(err => {
//             reject(false)
//         })
//     })

import firebaseGrab, { database, firestore } from '../../../pages/Home/firebase';
// import firebaseMidtrans, {databaseMidtrans} from '../../firebase/fire-midtrans';


export const registerGrab = (data) => (dispatch) => {
    return new Promise((resolve) => {
        firebaseGrab.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(response => {
            firestore.collection("usersCollection").doc(response.user.metadata.a).set({
                email: response.user.email,
                uid: response.user.uid,
                emailVerified: response.user.emailVerified,
                nama: data.dataUser.nama,
                alamat: data.dataUser.alamat,
                nomer: data.dataUser.nomer,
                toko: data.dataUser.toko,
                kota: data.dataUser.kota
            })
            const dataUser1 = {
                email: response.user.email,
                uid: response.user.uid,
                emailVerified: response.user.emailVerified,
                nama: data.dataUser.nama,
                alamat: data.dataUser.alamat,
                nomer: data.dataUser.nomer,
                toko: data.dataUser.toko,
                provinsi: data.dataUser.provinsi,
                status: response.user.metadata.a
            }
            console.log(response)
            resolve(dataUser1);
            localStorage.setItem('registerData', JSON.stringify(dataUser1));
        })
    })
}


export const loginGrab = (data) => (dispatch) => {
    const db = firebaseGrab.firestore();
    return new Promise((resolve) => {
        const dataFirestoreUser = [];
        firebaseGrab.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(response => {
            let arrayFs =[];
            const docRef = db.collection('usersCollection').doc(response.user.metadata.a);
                docRef.get().then(function(doc) {
                    arrayFs.push({
                        data: doc.data()
                    })
                    localStorage.setItem('dataFs', JSON.stringify(arrayFs))
                })

                setTimeout(() => {
                    const dataUser2 = {
                        email: response.user.email,
                        uid: 'penjual',
                        namaPenjual: response.user.nama,
                        status: response.user.metadata.a,
                        emailVerified: response.user.emailVerified,
                        refreshToken: response.user.refreshToken
                    }
                    localStorage.setItem('loginData', JSON.stringify(dataUser2));
                    resolve(dataUser2);
                }, 2000)
        })
    })
}


export const addDataGrab = (data) => (dispatch) => {
    return new Promise((resolve) => {
        const dataUser = JSON.parse(localStorage.getItem('loginData'));
        const dataFS = JSON.parse(localStorage.getItem('dataFs'))
        let arrayFs =[];
        const docRef = firestore.collection('usersCollection').doc(dataUser);
        docRef.get().then(function(doc) {
            arrayFs.push({
                data: doc.data()
            })
        })
        database.ref('sell/' + data.status)
        .push({
            nama: data.nama,
            harga: data.harga,
            foto: data.foto,
            status: data.status,
            toko: data.toko,
            unggulan: data.unggulan,
            kategori: data.kategori,
        })
        .then(res =>{
            console.log('data ini:' ,res.path.pieces_[2]);
            resolve(true);
            // penjual: dataFS.data.nama
        }) 
    })
}

export const addDataOrder = (data) => (dispatch) => {
    return new Promise((resolve) => {
        database.ref('order/' + data.status)
        .push({
            order_id: data.order_id,
            gross_amount: data.amount,
            category: data.category,
            city: data.city,
            time: data.date
        })
        .then(res =>{
            console.log('data order:' ,res.path.pieces_[2]);
            resolve(true);
        }) 
    })
}

export const getDataOrder = (data) => (dispatch) => {
    const getDataOrder = database.ref('order/orderan');
    return new Promise((resolve) => {
        getDataOrder.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({type: 'ORDER_MIDTRANS', value: array})
        })
    })
}

export const getData = (data) => (dispatch) => {
    const getDataGrab = database.ref('sell/' + data);
    return new Promise((resolve) => {
        getDataGrab.on('value', (snapshot) => {
            const array = [];
            Object.keys(snapshot.val()).map(key => {
                array.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({type: 'ORDER_GRAB', value: array})
            console.log('firebaseGetData: ', snapshot.val());
        })
    })
}

export const masukToko = (data) => (dispatch) => {
    const array = [];
    array.push({
        status: data.status,
        nama: data.nama,
        background: data.background,
        unggulan: data.unggulan,
        kategori: data.kategori
    })
    console.log('array saya :',array[0].nama)
    dispatch({type: 'STATUS_GRAB_USER', value: array});
    console.log(data)
}