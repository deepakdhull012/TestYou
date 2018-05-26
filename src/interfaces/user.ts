export interface IUser {
    _id:string,
    userName:string,
    email: number,
    password: string,
    mobile:number,
    isverified:boolean,
    isPrime:boolean,
    gmailImage:string,
    facebookImage:string,
    uploadedImage:string,
    displayImage:string,
    questionsAttemptedCorrectly:string[],
    questionsAttempted:string[];

}
