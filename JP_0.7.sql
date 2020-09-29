/*
 * BASE DE DATOS CREADA POR REOARRIETA :V
 * VERSION 0.7.2
 * COPYRIGHT 2020
 */

--Creamos la base de datos [JP_0.7]--
create database [JP_0.7]
go
--Usamos la base de datos [JP_0.7]--
use [JP_0.7]
go
--Creamos la tabla Estado--
create table Estado
(
id int identity (1,1) not null,
tipoEstado varchar(10) not null,
--Establecemos la llave primaria--
constraint PK_Estado primary key (id)
)
go
--Insertamos datos en la tabla Estado--
insert [dbo].[Estado] ([tipoEstado]) values ('Activo')
insert [dbo].[Estado] ([tipoEstado]) values ('Inactivo')
insert [dbo].[Estado] ([tipoEstado]) values ('Eliminado')
go
--Creamos la tabla Persona--
create table Persona
(
id int identity (1,1) not null,
nombre varchar(20) not null,
apellido varchar(20) not null,
cedula varchar(15) unique not null,
fechaNacimiento date not null,
correo varchar(50) unique not null,
contrasena varchar(64) not null,
usuario varchar(20) unique not null,
telefono varchar(10) unique not null,
tipoRol int not null,
idEstado int not null,
jwt varchar(max) null,
token varchar(64) null,
--Establecemos las llaves primaria y foranea--
constraint PK_Usuario primary key (id),
constraint FK_Usuario_Estado foreign key (idEstado) references Estado (id)
)
go
--Insertamos datos en la tabla Persona--
insert [dbo].[Persona] ([nombre], [apellido], [cedula], [fechaNacimiento], [correo], [contrasena], [usuario], [telefono], [tipoRol], [idEstado], [jwt], [token]) values ('Luz','Ortega','64479387', CAST('2020-06-15' AS Date),'lulu0908@hotmail.es','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','Lucy','3103200228', 1, 1, NULL, NULL)
insert [dbo].[Persona] ([nombre], [apellido], [cedula], [fechaNacimiento], [correo], [contrasena], [usuario], [telefono], [tipoRol], [idEstado], [jwt], [token]) values ('Camilo','Ramos','12345678', CAST('2020-06-15' AS Date),'yakjura@hotmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','Yakjura','3103025185', 1, 1, NULL, NULL)
insert [dbo].[Persona] ([nombre], [apellido], [cedula], [fechaNacimiento], [correo], [contrasena], [usuario], [telefono], [tipoRol], [idEstado], [jwt], [token]) values ('Andrea','Ortega','123456789', CAST('2020-06-16' AS Date),'ladortega@gmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','Andru','1234567890', 1, 1, NULL, NULL)
insert [dbo].[Persona] ([nombre], [apellido], [cedula], [fechaNacimiento], [correo], [contrasena], [usuario], [telefono], [tipoRol], [idEstado], [jwt], [token]) values ('JobsPhones','JobsPhones','00000000', CAST('2017-01-01' AS Date),'jobsphones@hotmail.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','JobsPhones','0000000000', 2, 1, NULL, NULL)
go
--Creamos la tabla Categoría--
create table Categoria
(
id int identity (1,1) not null,
categoriaGeneral varchar(12) not null,
categoriaEspecifica varchar(30) unique not null,
idEstadoCategoria int not null,
--Establecemos las llave primaria y foranea--
constraint PK_Categoria primary key (id),
constraint PK_Categoria_Estado foreign key (idEstadoCategoria) references Estado (id)
)
go
--Insertamos datos en la tabla Categoría--
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Celulares','Accesorios para Celulares',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Celulares','Gafas de Realidad Virtual',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Celulares','Repuestos de Celulares',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Celulares','Smartwatches y Accesorios',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Celulares','Teléfonos y Smartphones',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Almacenamiento',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Cables y Hubs USB',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Cámaras Web y Audio para PC',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Conectividad y Redes',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Estabilizadores y UPS',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Impresión',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Lectores y Scanners',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Limpieza y Cuidado de PCs',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Monitores y Accesorios',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Mouses, Teclados y Controles',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Palms, Agendas Y Accesorios',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','PC de Escritorio',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Porta CDs, Cajas Y Sobres',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Portátiles Y Accesorios',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Software',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Tablets y Accesorios',1)
insert [dbo].[Categoria] ([categoriaGeneral], [categoriaEspecifica], [idEstadoCategoria]) values ('Computación','Vídeo Beams y Pantallas',1)
go
--Creamos la tabla Producto--
create table Producto
(
id int identity (1,1) not null,
nombreProducto varchar(100) unique not null,
idCategoriaProducto int not null,
costoProducto int not null,
precioProducto int not null,
existenciaProducto int not null,
descripcionProducto varchar(max) null,
imagenProducto varchar(max) null, --toca crear una tabla aparte que almacene las url que debes alojarse aparte
idEstadoProducto int not null,
--Establecemos las llaves primaria y foraneas--
constraint PK_Producto primary key (id),
constraint FK_Producto_Categoria foreign key (idCategoriaProducto) references Categoria (id),
constraint FK_Producto_Estado foreign key (idEstadoProducto) references Estado (id)
)
go
--Insertamos datos en la tabla Producto--
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Mouse Gamer VSG EON Retroiluminado', 15, 12000, 18000, 3, 'Diseño ergonómico
Sensor óptico de alta precisión con 1200 DPI
Retroiluminación de 7 colores con efecto respiración
4 botones
DPI: 800/1000/1200
Hasta 3 millones de clics
Interfaces: USB 2.0
Longitud del cable: 1.5m
Tamaño: 118*66*35mm', N'assets/img/mouse gamer.png', 1)
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Teclado USB Gamer WIA W-KG02 Luces Led', 15, 28000, 35000, 4, 'ULTRA-SLIM 
KEYBORADMECHANICAL 
PERFORMANCEPOWER 
REQUIREMENTWORKING 
ENVIROMENT
AND HUMIDITYSPECIFICATION', N'assets/img/teclado gamer.PNG', 1)
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Memoria USB 4 GB Onedigital', 6, 10000, 15000, 5, 'Temperatura de funcionamiento: 250°C to 85°C.
Temperatura de almacenamiento: -40°C to 85°C.
Voltaje: 2.7v - 3.6v.
Dimensiones: 45mm - 12mm - 3.4mm.
Peso: 0.5g Aprox.(Micro SD only).', N'assets/img/One 4 GB.PNG', 1)
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Memoria USB 8 GB Onedigital', 6, 15000, 20000, 5, 'Temperatura de funcionamiento: 250°C to 85°C.
Temperatura de almacenamiento: -40°C to 85°C.
Voltaje: 2.7v - 3.6v.
Dimensiones: 45mm - 12mm - 3.4mm.
Peso: 0.5g Aprox.(Micro SD only).', N'assets/img/One 8 GB.PNG', 1)
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Memoria USB 16 GB Onedigital', 6, 23000, 28000, 2, 'Temperatura de funcionamiento: 250°C to 85°C.
Temperatura de almacenamiento: -40°C to 85°C.
Voltaje: 2.7v - 3.6v.
Dimensiones: 45mm - 12mm - 3.4mm.
Peso: 0.5g Aprox.(Micro SD only).', N'assets/img/One 16 GB.PNG', 1)
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Memoria USB 32 GB Onedigital', 6, 30000, 35000, 3, 'Temperatura de funcionamiento: 250°C to 85°C.
Temperatura de almacenamiento: -40°C to 85°C.
Voltaje: 2.7v - 3.6v.
Dimensiones: 45mm - 12mm - 3.4mm.
Peso: 0.5g Aprox.(Micro SD only).', N'assets/img/One 32 GB.PNG', 1)
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Memoria USB 64 GB Onedigital', 6, 45000, 50000, 3, 'Temperatura de funcionamiento: 250°C to 85°C.
Temperatura de almacenamiento: -40°C to 85°C.
Voltaje: 2.7v - 3.6v.
Dimensiones: 45mm - 12mm - 3.4mm.
Peso: 0.5g Aprox.(Micro SD only).', N'assets/img/One 64 GB.PNG', 1)
insert [dbo].[Producto] ([nombreProducto], [idCategoriaProducto], [costoProducto], [precioProducto], [existenciaProducto], [descripcionProducto], [imagenProducto], [idEstadoProducto]) values ('Mini Teclado inalambrico Touchpad Android, Tv, Windows', 15, 40000, 45000, 4, 'Es un Mando a distancia que te permite navegar por la red, seleccionar elementos y escribir con facilidad. Realmente hace que cualquier dispositivo como Smart tv, computadores, portátiles, proyectores, etc sea cómodo y fácil de manejar', N'assets/img/Mini Teclado.PNG', 1)
go
--Creamos la tabla Proveedor--
create table Proveedor
(
id int identity (1,1) not null,
nombreProveedor varchar(20) unique not null,
nitProveedor varchar(20) unique null,
direccionProveedor varchar(20) not null,
telefonoProveedor varchar(10) not null,
urlProveedor varchar(100) not null,
idEstadoProveedor int not null,
--Establecemos las llaves primaria y foranea--
constraint PK_Proveedor primary key (id),
constraint FK_Proveedor_Estado foreign key (idEstadoProveedor) references Estado (id)
)
go
--Insertamos datos en la tabla provendor
insert [dbo].[Proveedor] ([nombreProveedor], [nitProveedor], [direccionProveedor], [telefonoProveedor], [urlProveedor], [idEstadoProveedor]) values ('JobsPhones','Nit','Cra. 81 #77a-76','7910707','www.jobsphones.com', 1)
go
--Creamos la tabla Entrada--
create table Entrada
(
id int identity (1,1) not null ,
idUsuarioAdmin int not null,
idProveedorEntrada int not null,
fechaEntrada datetime not null,
idEstadoEntrada int not null,
--Establecemos las llaves primaria y foranea--
constraint PK_Entrada primary key (id),
constraint FK_Entrada_Usuario foreign key (idUsuarioAdmin) references Persona (id),
constraint FK_Entrada_Provedor foreign key (idProveedorEntrada) references Proveedor (id),
constraint FK_Entrada_Estado foreign key (idEstadoEntrada) references Estado (id)
)
go
--Cremaos la tabla Detalle de Entrada--
create table DetalleEntrada
(
id int identity (1,1) not null,
idEntrada int not null,
idProductoEntrada int not null,
costoProducto int not null,
cantidadEntrada int not null,
--costoEntrada int not null,
--Establecemos las llaves primaria y foraneas--
constraint PK_DetalleEntrada primary key (id),
constraint FK_DetalleEntrada_Entrada foreign key (idEntrada) references Entrada (id),
constraint FK_DetalleEntrada_Producto foreign key (idProductoEntrada) references Producto (id)
)
go
--Creamos la tabla Pérdida--
create table Perdida
(
id int identity (1,1) not null,
idUsuarioAdmin int not null,
fechaPerdida datetime not null,
idEstadoPerdida int not null,
--Establecemos las llaves primaria y foranea--
constraint PK_Perdida primary key (id),
constraint FK_Perdida_Usuario foreign key (idUsuarioAdmin) references Persona (id),
constraint FK_Perdida_Estado foreign key (idEstadoPerdida) references Estado (id)
)
go
--Creamos la tabla Detalle de Pérdida--
create table DetallePerdida
(
id int identity (1,1) not null,
idPerdida int not null,
idProductoPerdida int not null,
costoProducto int not null,
cantidadPerdida int not null,
descripcionPerdida varchar(max) not null,
--Establecemos las llaves primaria y foraneas--
constraint PK_DetallePerdida primary key (id),
constraint FK_DetallePerdida_Perdida foreign key (idPerdida) references Perdida (id),
constraint FK_DetallePerdida_Producto foreign key (idProductoPerdida) references Producto (id)
)
go
--Creamos la tabla Venta--
create table Venta
(
id int identity (1,1) not null,
idUsuarioAdmin int not null,
idUsuarioCliente int not null,
fechaVenta datetime not null,
idEstadoVenta int not null,
--Establecemos las llaves primaria y foraneas--
constraint PK_Venta primary key (id),
constraint FK_Venta_Usuario foreign key (idUsuarioAdmin) references Persona (id),
constraint FK_Venta_Estado foreign key (idEstadoVenta) references Persona (id)
)
go
--Creamos la tabla Pago--
/*create table Pago
(
idPago int not null,
tipoPago char(10) not null,
--Establecemos la llave primaria--
constraint PK_Pago primary key (idPago)
)
go
--Insertamos datos en la tabla Pago--
insert [dbo].[Pago] ([idPago], [tipoPago]) values (1, N'Efectivo  ')
insert [dbo].[Pago] ([idPago], [tipoPago]) values (2, N'Tarjeta   ')
insert [dbo].[Pago] ([idPago], [tipoPago]) values (3, N'Deuda     ')
go*/
--Creamos la tabla Detalle de Venta--
create table DetalleVenta
(
id int identity (1,1) not null,
idVenta int not null,
--idFacturaVenta int not null,
idProductoVenta int not null,
--idPagoVenta int not null,
cantidadVenta int not null,
precioProducto int not null,
descuentoVenta int not null,
--Establecemos las llaves primaria y foraneas--
constraint PK_DetalleVenta primary key (id),
constraint FK_DetalleVenta_Venta foreign key (idVenta) references Venta (id),
constraint FK_DetalleVenta_Producto foreign key (idProductoVenta) references Producto (id),
--constraint FK_DetalleVenta_Pago foreign key (idPagoVenta) references Pago (idPago)
)
go
--Creamos la tabla Recibo--
/*create table Factura
(
idFactura int not null,
fehchaFactura date not null,
idPagoFactura int not null,
descuentoFactura int null,
totalFactura int not null,
--Establecemos las llaves primaria y foranea--
constraint PK_Factura primary key (idFactura),
constraint FK_Factura_Pago foreign key (idPagoFactura) references Pago (idPago)
)
go*/

/*
 * PROCEMINIENTOS ALMACENADOS
 *

--Prodecimientos almacenados de la tabla Categoría--

create proc SP_Cg_Agregar
@catGeneral varchar(12),
@catEspecifica varchar(30)
as
insert into Categoria values ((select max(id) from Categoria)+1,@catGeneral,@catEspecifica)
go
-----------------------------------------------------
create proc SP_Cg_Editar
@catGeneral varchar(12),
@catEspecifica varchar(30),
@id int
as
update Categoria set categoriaGeneral=@catGeneral,categoriaEspecifica=@catEspecifica
where id=@id
go
-----------------------------------------------------
create proc SP_Cg_Eliminar
@id int
as
delete from Categoria where id=@id
go
-----------------------------------------------------

--Prodecimientos almacenados de la tabla Producto--

create proc SP_Pd_Agregar
@nomProducto varchar(100),
@catProducto int,
@cosProducto int,
@preProducto int,
@exiProducto int,
@desProducto varchar(MAX),
@estProducto int
as
insert into Producto values ((select max(id) from Producto)+1,
@nomProducto,@catProducto,@cosProducto,@preProducto,@exiProducto,@desProducto,@estProducto)
go
---------------------------------------------------
create proc SP_Pd_Editar
@nomProducto varchar(100),
@catProducto int,
@cosProducto int,
@preProducto int,
@exiProducto int,
@desProducto varchar(MAX),
@estProducto int,
@id int
as
update Producto set
nombreProducto=@nomProducto,idCategoriaProducto=@catProducto,costoProducto=@cosProducto,
precioProducto=@preProducto,existenciaProducto=@exiProducto,descripcionProducto=@desProducto,
idEstadoProducto=@estProducto where id=@id
go
---------------------------------------------------
create proc SP_Pd_Eliminar
@id int
as
delete from Producto where id=@id;
go

--Procedimientos de la tabla DetalleVenta--

create proc SP_DV_Agregar
@idVenta int,
@idProducto int,
@cantidad int,
@precio int,
@descuento int
as
insert into DetalleVenta values((select MAX(id)from DetalleVenta)+1,@idVenta,@idProducto,@cantidad,
@precio,@descuento)
go
---------------------------------------------------

--Procedimientos de la tabla Persona

create proc SP_Ps_Agregar
@nombre varchar(20),
@apellido varchar(20),
@cedula varchar(15),
@fechaNac date,
@correo varchar(50),
@usuario varchar(20),
@contraseña varchar(64),
@telefono varchar(10),
@tipo int
as
insert into Persona values((select MAX(id) from Persona)+1,@nombre,@apellido,@cedula,@fechaNac,
@correo,@usuario,@contraseña,@telefono,@tipo)
---------------------------------------------------
*/
--Vista de la tabla Producto

create view V_Pd_Mostrar
as
select p.id,p.nombreProducto,p.idCategoriaProducto,c.categoriaEspecifica,
p.costoProducto,p.precioProducto,p.existenciaProducto,p.descripcionProducto,p.imagenProducto 
from Producto p inner join Categoria c on p.idCategoriaProducto = c.id 
where p.idEstadoProducto != 3
go
----------------------------------------------------

--Vistas de la tabla Persona
/*create view V_Ps_Validate
as
select id,cedula,correo,usuario,telefono from Persona
go*/
---------------------------------------------------
create view V_Ps_Admin
as
select id,nombre,apellido,cedula,correo,usuario,telefono,tipoRol,jwt 
from Persona where tipoRol = 1 and idEstado = 1
go
----------------------------------------------------
create view V_Ps_Cliente
as
select id,nombre,apellido,cedula,correo,usuario,telefono,tipoRol 
from Persona where tipoRol = 2 and idEstado = 1
go
----------------------------------------------------

--Vista de la tabla Detalle de Venta
create view V_DV_Mostrar
as
select dv.id,dv.idVenta,dv.idProductoVenta,p.nombreProducto,dv.cantidadVenta,dv.precioProducto,dv.descuentoVenta,
dv.precioProducto*dv.cantidadVenta-dv.descuentoVenta totalVenta from DetalleVenta dv inner join Producto p 
on dv.idProductoVenta = p.id
go
----------------------------------------------------

--Vista de la tabla Venta
create view V_Vt_Mostrar
as
select v.id, v.idUsuarioAdmin, a.usuario as admin,
v.idUsuarioCliente, c.usuario as cliente, v.fechaVenta,
sum(dv.totalVenta) as total from Venta v
inner join V_Ps_Admin a on v.idUsuarioAdmin = a.id 
inner join V_Ps_Cliente c on v.idUsuarioCliente = c.id
inner join V_DV_Mostrar dv on v.id = dv.idVenta
group by  v.id, v.idUsuarioAdmin, a.usuario,
v.idUsuarioCliente, c.usuario, v.fechaVenta
go
----------------------------------------------------

--Vista de la tabla Detalle de Entrada
create view V_DE_Mostrar
as
select de.id,de.idEntrada,de.idProductoEntrada,p.nombreProducto,de.costoProducto,de.cantidadEntrada,
de.costoProducto*de.cantidadEntrada totalEntrada from DetalleEntrada de inner join Producto p 
on de.idProductoEntrada = p.id
go
----------------------------------------------------

--Vista de la tabla Entrada
create view V_Et_Mostrar
as
select e.id,e.idUsuarioAdmin,ps.usuario as Admin,e.idProveedorEntrada,p.nombreProveedor,e.fechaEntrada,
sum(de.totalEntrada) as total
from Entrada e inner join Persona ps on e.idUsuarioAdmin=ps.id 
inner join Proveedor p on e.idProveedorEntrada = p.id inner join V_DE_Mostrar de on e.id = de.idEntrada
group by e.id,e.idUsuarioAdmin,ps.usuario,e.idProveedorEntrada,p.nombreProveedor,e.fechaEntrada
go
----------------------------------------------------

--Vista de la tabla Detalle de Perdida
create view V_DP_Mostrar
as
select dp.id,dp.idPerdida,dp.idProductoPerdida,p.nombreProducto,dp.costoProducto,dp.cantidadPerdida,
dp.descripcionPerdida,dp.costoProducto * dp.cantidadPerdida totalPerdida
from DetallePerdida dp inner join Producto p on dp.idProductoPerdida = p.id
go
----------------------------------------------------

--Vista de la tabla Perdida
create view V_Pr_Mostrar
as
select perd.id,perd.idUsuarioAdmin,p.usuario as Admin,perd.fechaPerdida,SUM(dp.totalPerdida) as total
from Perdida perd inner join Persona p on perd.idUsuarioAdmin = p.id inner join 
V_DP_Mostrar dp on perd.id = dp.idPerdida
group by perd.id,perd.idUsuarioAdmin,p.usuario,perd.fechaPerdida
go
----------------------------------------------------