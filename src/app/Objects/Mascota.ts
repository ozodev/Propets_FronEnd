export class Mascota{
    private _nombre:string;    
    private _peso:number;
    private _raza:string;
    private _color:string;
    private _size:string;    
    private _id:string;
    constructor(){
        this._nombre='';
        this._peso=0;
        this._raza='';
        this._color='';
        this._size='';
        this._id='';
    }
    public get nombre(){return this._nombre;}
    public set nombre(nombre:string){this._nombre=nombre;}
    public get peso(){return this._peso;}
    public set peso(peso:number){this._peso=peso;}
    public get raza(){return this._raza;}
    public set raza(raza:string){this._raza=raza;}
    public get color(){return this._color;}
    public set color(color:string){this._color=color;}
    public get size(){return this._size;}
    public set size(size:string){this._size=size;} 
    public get id(){return this._id;}    
    public set id(id:string){this._id=id;}        
}