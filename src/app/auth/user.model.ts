export class User{
    constructor(public email: string,
        public _id: string,
        public username: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public avatar?:string,
    ) { }
    
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}