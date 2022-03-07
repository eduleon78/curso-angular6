
export class DestinoViaje {
    public selected: boolean = false;
    public servicios: string[] = ['Desayuno', 'Almuerzo', 'Cena'];
    public id: string = '';
    public vote: number = 0;
    public nombre: string;
    public imageUrl: string;
    
    
    constructor(_nombre: string = '', _imageUrl:string = '') {
        this.nombre = _nombre;
        this.imageUrl = _imageUrl;
    }

    updateID(i:number): void {
        this.id = i.toString();
    }

    setSelected(s:boolean) {
        this.selected = s;
    }
    isSelected() {
        return this.selected;
    }
    voteUp(): void {
        this.vote ++;
    }
    voteDown(): void {
        this.vote --;
    }
}
