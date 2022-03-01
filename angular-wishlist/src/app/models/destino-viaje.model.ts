import {v4 as uuid} from 'uuid';

export class DestinoViaje {
    selected: boolean;
    servicios: string[];
    id: uuid();    
    constructor(public nombre: string, public imageUrl: string, public votes: number = 0) {
        this.servicios = ['piscina', 'desayuno'];
    }
    setSelected(s:boolean) {
        this.selected = s;
    }
    isSelected() {
        return this.selected;
    }
    voteUp(): any {
        this.votes++;
    }
    voteDown(): any {
        this.votes--;
    }
}
