import { pub, pri } from './api'

export default {
    getUser () {
        return new Promise((resolve, reject) => {
            pri.get('users/ebuchmann')
                .then(res => {
                    resolve(res)
                })
        })
    }
}
