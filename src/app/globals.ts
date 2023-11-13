import { Injectable } from "@angular/core";

Injectable
@Injectable()
export class Globals {
    typeButton = {
        fence: {
            bomb: 1,
            river: 2,
            mountain: 3,
            blocked: 4
        },
        excute: {
            runProgram: 5,
            stopProgram: 6
        },
        select: {
            algorithm: 7,
            speed: 8,
        },
    }
}


