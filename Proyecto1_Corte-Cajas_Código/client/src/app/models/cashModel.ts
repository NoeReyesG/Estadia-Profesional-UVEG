export class Cash {

    constructor(init?:Partial<Cash>){
        Object.assign(this, init);
    }

    _id: string = '';
    oneThousand: number|null|undefined|null|undefined = 0;
    fiveHundred: number|null|undefined =0;
    twoHundred: number|null|undefined = 0;
    oneHundred: number|null|undefined = 0;
    fifty: number|null|undefined = 0;
    twenty: number|null|undefined = 0;
    ten: number|null|undefined = 0;
    five: number|null|undefined = 0;
    two: number|null|undefined = 0;
    one: number|null|undefined = 0;
    fiftyCents: number|null|undefined = 0;
    created_at: Date = new Date();
    //updated_at: Date = new Date();
    
}