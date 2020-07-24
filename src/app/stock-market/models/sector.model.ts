export class Sector {
    id: number;
    sectorCode: string;
    sectorName: string;
    brief?: string;

    constructor(id:number, sectorName:string, brief:string="NA"){
        this.id = id;
        this.sectorName = sectorName;
        // sectorName == sectorCode
        this.sectorCode = sectorName;
        this.brief = brief;
    }
}

/*
Automotive
Banking
Chemicals
Oil & Gas
Telecom
*/