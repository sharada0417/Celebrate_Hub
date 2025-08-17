class UnauthorizedError extends Error{
    constructor(message:string){
        super(message);
        this.name = "UnathorizedError"
    } 
}

export default UnauthorizedError;