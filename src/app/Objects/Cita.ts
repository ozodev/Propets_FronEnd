export class Cita{
    private _id:string;
    private _franja:string
    private _dia: number;
    private _mes: number;
    private _year: number;
    private _type:string;
    private _centro:string;
    private _veterinario:string;
    private _usuario:string;
    private _mascota:string;
    private _status:string;

    constructor() {
    this._id = ''
    this._franja = ''
    this._dia = 0
    this._mes = 0
    this._year = 0
    this._type = ''
    this._centro = ''
    this._veterinario = ''
    this._usuario = ''
    this._mascota =''
    this._status = ''
    }

    public get id(){return this._id}
    public set id(id:string){this._id=id;}
    public get franja(){return this._franja}
    public set franja(franja:string){this._franja=franja}
    public get dia(){return this._dia}
    public set dia(dia:number){this._dia=dia}
    public get mes(){return this._mes}
    public set mes(mes:number){this._mes=mes}
    public get year(){return this._year}
    public set year(year:number){this._year=year}
    public get type(){return this._type}
    public set type(type:string){this._type=type}
    public get centro(){return this._centro}
    public set centro(centro:string){this._centro=centro}
    public get veterinario(){return this._veterinario}
    public set veterinario(id:string){this._veterinario=id}
    public get usuario(){return this._usuario}
    public set usuario(email:string){this._usuario=email}
    public get mascota(){return this._mascota}    
    public set mascota(mascota:string){this._mascota=mascota}
    public get status(){return this._status}
    public set status(status:string){this._status=status}
}