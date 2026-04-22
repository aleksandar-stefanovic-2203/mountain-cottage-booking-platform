export class RoomRate {
    idRR = 0;
    periodName = ""
    periodStart: Date | null = null
    periodEnd: Date | null = null
    priceAdult = 0
    priceChild = 0
    idC = 0

    constructor(periodName: string = ""){
        this.periodName = periodName
    }
}