export interface Route {
    id?: number,
    nombre: string,
    puntoOrigenLAT: number,
    puntoOrigenLNG: number,
    puntoDestinoLAT: number,
    puntoDestinoLNG: number,
    horarioSalida: any,
    tiempoLlegada: number,
    precioRuta: number,
    kilometraje: number,
    idAuto: number,
    isActive?: any
}