import { pri } from './api'

export const currentUser = function () {
    return new Promise((resolve, reject) => {
        pri.get('users/ebuchmann')
            .then(res => {
                resolve(res.data.login)
            })
            .catch(err => {
                reject(err)
            })
    })
}
