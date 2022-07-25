export class Persona{
    private _nombre:string
    private _apellido:string
    private _email:string
    private _roles:[]
    private _telefono:string
    private _enabled:boolean
    
    constructor(){
        this._apellido=''
        this._nombre=''
        this._email=''
        this._roles=[]
        this._telefono=''
        this._enabled=false;
    }

    public get nombre(){return this._nombre;}
    public set nombre(nombre:string){this._nombre=nombre;}

    public get apellido(){return this._apellido;}
    public set apellido(apellido:string){this._apellido=apellido;}

    public get email(){return this._email;}
    public set email(email:string){this._email=email;}

    public get telefono(){return this._telefono;}
    public set telefono(telefono:string){this._telefono=telefono;}

    public get enable(){return this._enabled;}
    public set enable(enable:boolean){this._enabled=enable;}

    public get roles(){return this._roles;}
    public set roles(roles:[]){this._roles=roles;}

}