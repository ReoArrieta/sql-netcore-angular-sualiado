using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Backend.Models
{
    public partial class JobsPhonesCTX : DbContext
    {
        public JobsPhonesCTX()
        {
        }

        public JobsPhonesCTX(DbContextOptions<JobsPhonesCTX> options)
            : base(options)
        {
        }

        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<DetalleEntrada> DetalleEntrada { get; set; }
        public virtual DbSet<DetallePerdida> DetallePerdida { get; set; }
        public virtual DbSet<DetalleVenta> DetalleVenta { get; set; }
        public virtual DbSet<Entrada> Entrada { get; set; }
        public virtual DbSet<Estado> Estado { get; set; }
        public virtual DbSet<Perdida> Perdida { get; set; }
        public virtual DbSet<Persona> Persona { get; set; }
        public virtual DbSet<Producto> Producto { get; set; }
        public virtual DbSet<Proveedor> Proveedor { get; set; }
        public virtual DbSet<VDeMostrar> VDeMostrar { get; set; }
        public virtual DbSet<VDpMostrar> VDpMostrar { get; set; }
        public virtual DbSet<VDvMostrar> VDvMostrar { get; set; }
        public virtual DbSet<VEtMostrar> VEtMostrar { get; set; }
        public virtual DbSet<VPdMostrar> VPdMostrar { get; set; }
        public virtual DbSet<VPrMostrar> VPrMostrar { get; set; }
        public virtual DbSet<VPsAdmin> VPsAdmin { get; set; }
        public virtual DbSet<VPsCliente> VPsCliente { get; set; }
        public virtual DbSet<VVtMostrar> VVtMostrar { get; set; }
        public virtual DbSet<Venta> Venta { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost;Database=JP_0.7;Trusted_Connection=True;");
                //optionsBuilder.UseSqlServer("Data Source=SQL5063.site4now.net;Initial Catalog=DB_A65800_JobsPhones;User Id=DB_A65800_JobsPhones_admin;Password=Ra86402*;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.HasIndex(e => e.CategoriaEspecifica)
                    .HasName("UQ__Categori__078431F6B3273752")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoriaEspecifica)
                    .IsRequired()
                    .HasColumnName("categoriaEspecifica")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CategoriaGeneral)
                    .IsRequired()
                    .HasColumnName("categoriaGeneral")
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.IdEstadoCategoria).HasColumnName("idEstadoCategoria");

                entity.HasOne(d => d.IdEstadoCategoriaNavigation)
                    .WithMany(p => p.Categoria)
                    .HasForeignKey(d => d.IdEstadoCategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("PK_Categoria_Estado");
            });

            modelBuilder.Entity<DetalleEntrada>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CantidadEntrada).HasColumnName("cantidadEntrada");

                entity.Property(e => e.CostoProducto).HasColumnName("costoProducto");

                entity.Property(e => e.IdEntrada).HasColumnName("idEntrada");

                entity.Property(e => e.IdProductoEntrada).HasColumnName("idProductoEntrada");

                entity.HasOne(d => d.IdEntradaNavigation)
                    .WithMany(p => p.DetalleEntrada)
                    .HasForeignKey(d => d.IdEntrada)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetalleEntrada_Entrada");

                entity.HasOne(d => d.IdProductoEntradaNavigation)
                    .WithMany(p => p.DetalleEntrada)
                    .HasForeignKey(d => d.IdProductoEntrada)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetalleEntrada_Producto");
            });

            modelBuilder.Entity<DetallePerdida>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CantidadPerdida).HasColumnName("cantidadPerdida");

                entity.Property(e => e.CostoProducto).HasColumnName("costoProducto");

                entity.Property(e => e.DescripcionPerdida)
                    .IsRequired()
                    .HasColumnName("descripcionPerdida")
                    .IsUnicode(false);

                entity.Property(e => e.IdPerdida).HasColumnName("idPerdida");

                entity.Property(e => e.IdProductoPerdida).HasColumnName("idProductoPerdida");

                entity.HasOne(d => d.IdPerdidaNavigation)
                    .WithMany(p => p.DetallePerdida)
                    .HasForeignKey(d => d.IdPerdida)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetallePerdida_Perdida");

                entity.HasOne(d => d.IdProductoPerdidaNavigation)
                    .WithMany(p => p.DetallePerdida)
                    .HasForeignKey(d => d.IdProductoPerdida)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetallePerdida_Producto");
            });

            modelBuilder.Entity<DetalleVenta>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CantidadVenta).HasColumnName("cantidadVenta");

                entity.Property(e => e.DescuentoVenta).HasColumnName("descuentoVenta");

                entity.Property(e => e.IdProductoVenta).HasColumnName("idProductoVenta");

                entity.Property(e => e.IdVenta).HasColumnName("idVenta");

                entity.Property(e => e.PrecioProducto).HasColumnName("precioProducto");

                entity.HasOne(d => d.IdProductoVentaNavigation)
                    .WithMany(p => p.DetalleVenta)
                    .HasForeignKey(d => d.IdProductoVenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetalleVenta_Producto");

                entity.HasOne(d => d.IdVentaNavigation)
                    .WithMany(p => p.DetalleVenta)
                    .HasForeignKey(d => d.IdVenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetalleVenta_Venta");
            });

            modelBuilder.Entity<Entrada>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FechaEntrada)
                    .HasColumnName("fechaEntrada")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdEstadoEntrada).HasColumnName("idEstadoEntrada");

                entity.Property(e => e.IdProveedorEntrada).HasColumnName("idProveedorEntrada");

                entity.Property(e => e.IdUsuarioAdmin).HasColumnName("idUsuarioAdmin");

                entity.HasOne(d => d.IdEstadoEntradaNavigation)
                    .WithMany(p => p.Entrada)
                    .HasForeignKey(d => d.IdEstadoEntrada)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Entrada_Estado");

                entity.HasOne(d => d.IdProveedorEntradaNavigation)
                    .WithMany(p => p.Entrada)
                    .HasForeignKey(d => d.IdProveedorEntrada)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Entrada_Provedor");

                entity.HasOne(d => d.IdUsuarioAdminNavigation)
                    .WithMany(p => p.Entrada)
                    .HasForeignKey(d => d.IdUsuarioAdmin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Entrada_Usuario");
            });

            modelBuilder.Entity<Estado>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.TipoEstado)
                    .IsRequired()
                    .HasColumnName("tipoEstado")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Perdida>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FechaPerdida)
                    .HasColumnName("fechaPerdida")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdEstadoPerdida).HasColumnName("idEstadoPerdida");

                entity.Property(e => e.IdUsuarioAdmin).HasColumnName("idUsuarioAdmin");

                entity.HasOne(d => d.IdEstadoPerdidaNavigation)
                    .WithMany(p => p.Perdida)
                    .HasForeignKey(d => d.IdEstadoPerdida)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Perdida_Estado");

                entity.HasOne(d => d.IdUsuarioAdminNavigation)
                    .WithMany(p => p.Perdida)
                    .HasForeignKey(d => d.IdUsuarioAdmin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Perdida_Usuario");
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.HasIndex(e => e.Cedula)
                    .HasName("UQ__Persona__415B7BE58A7003FE")
                    .IsUnique();

                entity.HasIndex(e => e.Correo)
                    .HasName("UQ__Persona__2A586E0B0DC51827")
                    .IsUnique();

                entity.HasIndex(e => e.Telefono)
                    .HasName("UQ__Persona__2A16D94517C5BE2A")
                    .IsUnique();

                entity.HasIndex(e => e.Usuario)
                    .HasName("UQ__Persona__9AFF8FC652A30DC7")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnName("apellido")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Cedula)
                    .IsRequired()
                    .HasColumnName("cedula")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Contrasena)
                    .IsRequired()
                    .HasColumnName("contrasena")
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnName("correo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnName("fechaNacimiento")
                    .HasColumnType("date");

                entity.Property(e => e.IdEstado).HasColumnName("idEstado");

                entity.Property(e => e.Jwt)
                    .HasColumnName("jwt")
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasColumnName("telefono")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.TipoRol).HasColumnName("tipoRol");

                entity.Property(e => e.Token)
                    .HasColumnName("token")
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.Usuario)
                    .IsRequired()
                    .HasColumnName("usuario")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEstadoNavigation)
                    .WithMany(p => p.Persona)
                    .HasForeignKey(d => d.IdEstado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Usuario_Estado");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasIndex(e => e.NombreProducto)
                    .HasName("UQ__Producto__A600056A155C9C4E")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CostoProducto).HasColumnName("costoProducto");

                entity.Property(e => e.DescripcionProducto)
                    .HasColumnName("descripcionProducto")
                    .IsUnicode(false);

                entity.Property(e => e.ExistenciaProducto).HasColumnName("existenciaProducto");

                entity.Property(e => e.IdCategoriaProducto).HasColumnName("idCategoriaProducto");

                entity.Property(e => e.IdEstadoProducto).HasColumnName("idEstadoProducto");

                entity.Property(e => e.ImagenProducto)
                    .HasColumnName("imagenProducto")
                    .IsUnicode(false);

                entity.Property(e => e.NombreProducto)
                    .IsRequired()
                    .HasColumnName("nombreProducto")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PrecioProducto).HasColumnName("precioProducto");

                entity.HasOne(d => d.IdCategoriaProductoNavigation)
                    .WithMany(p => p.Producto)
                    .HasForeignKey(d => d.IdCategoriaProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Producto_Categoria");

                entity.HasOne(d => d.IdEstadoProductoNavigation)
                    .WithMany(p => p.Producto)
                    .HasForeignKey(d => d.IdEstadoProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Producto_Estado");
            });

            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.HasIndex(e => e.NitProveedor)
                    .HasName("UQ__Proveedo__C60D77114F3738B7")
                    .IsUnique();

                entity.HasIndex(e => e.NombreProveedor)
                    .HasName("UQ__Proveedo__2EBB245B620462A5")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DireccionProveedor)
                    .IsRequired()
                    .HasColumnName("direccionProveedor")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.IdEstadoProveedor).HasColumnName("idEstadoProveedor");

                entity.Property(e => e.NitProveedor)
                    .HasColumnName("nitProveedor")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.NombreProveedor)
                    .IsRequired()
                    .HasColumnName("nombreProveedor")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TelefonoProveedor)
                    .IsRequired()
                    .HasColumnName("telefonoProveedor")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UrlProveedor)
                    .IsRequired()
                    .HasColumnName("urlProveedor")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEstadoProveedorNavigation)
                    .WithMany(p => p.Proveedor)
                    .HasForeignKey(d => d.IdEstadoProveedor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Proveedor_Estado");
            });

            modelBuilder.Entity<VDeMostrar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_DE_Mostrar");

                entity.Property(e => e.CantidadEntrada).HasColumnName("cantidadEntrada");

                entity.Property(e => e.CostoProducto).HasColumnName("costoProducto");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdEntrada).HasColumnName("idEntrada");

                entity.Property(e => e.IdProductoEntrada).HasColumnName("idProductoEntrada");

                entity.Property(e => e.NombreProducto)
                    .IsRequired()
                    .HasColumnName("nombreProducto")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalEntrada).HasColumnName("totalEntrada");
            });

            modelBuilder.Entity<VDpMostrar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_DP_Mostrar");

                entity.Property(e => e.CantidadPerdida).HasColumnName("cantidadPerdida");

                entity.Property(e => e.CostoProducto).HasColumnName("costoProducto");

                entity.Property(e => e.DescripcionPerdida)
                    .IsRequired()
                    .HasColumnName("descripcionPerdida")
                    .IsUnicode(false);

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdPerdida).HasColumnName("idPerdida");

                entity.Property(e => e.IdProductoPerdida).HasColumnName("idProductoPerdida");

                entity.Property(e => e.NombreProducto)
                    .IsRequired()
                    .HasColumnName("nombreProducto")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TotalPerdida).HasColumnName("totalPerdida");
            });

            modelBuilder.Entity<VDvMostrar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_DV_Mostrar");

                entity.Property(e => e.CantidadVenta).HasColumnName("cantidadVenta");

                entity.Property(e => e.DescuentoVenta).HasColumnName("descuentoVenta");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdProductoVenta).HasColumnName("idProductoVenta");

                entity.Property(e => e.IdVenta).HasColumnName("idVenta");

                entity.Property(e => e.NombreProducto)
                    .IsRequired()
                    .HasColumnName("nombreProducto")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PrecioProducto).HasColumnName("precioProducto");

                entity.Property(e => e.TotalVenta).HasColumnName("totalVenta");
            });

            modelBuilder.Entity<VEtMostrar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Et_Mostrar");

                entity.Property(e => e.Admin)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FechaEntrada)
                    .HasColumnName("fechaEntrada")
                    .HasColumnType("datetime");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdProveedorEntrada).HasColumnName("idProveedorEntrada");

                entity.Property(e => e.IdUsuarioAdmin).HasColumnName("idUsuarioAdmin");

                entity.Property(e => e.NombreProveedor)
                    .IsRequired()
                    .HasColumnName("nombreProveedor")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Total).HasColumnName("total");
            });

            modelBuilder.Entity<VPdMostrar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Pd_Mostrar");

                entity.Property(e => e.CategoriaEspecifica)
                    .IsRequired()
                    .HasColumnName("categoriaEspecifica")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.CostoProducto).HasColumnName("costoProducto");

                entity.Property(e => e.DescripcionProducto)
                    .HasColumnName("descripcionProducto")
                    .IsUnicode(false);

                entity.Property(e => e.ExistenciaProducto).HasColumnName("existenciaProducto");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdCategoriaProducto).HasColumnName("idCategoriaProducto");

                entity.Property(e => e.ImagenProducto)
                    .HasColumnName("imagenProducto")
                    .IsUnicode(false);

                entity.Property(e => e.NombreProducto)
                    .IsRequired()
                    .HasColumnName("nombreProducto")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PrecioProducto).HasColumnName("precioProducto");
            });

            modelBuilder.Entity<VPrMostrar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Pr_Mostrar");

                entity.Property(e => e.Admin)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FechaPerdida)
                    .HasColumnName("fechaPerdida")
                    .HasColumnType("datetime");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdUsuarioAdmin).HasColumnName("idUsuarioAdmin");

                entity.Property(e => e.Total).HasColumnName("total");
            });

            modelBuilder.Entity<VPsAdmin>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Ps_Admin");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnName("apellido")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Cedula)
                    .IsRequired()
                    .HasColumnName("cedula")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnName("correo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Jwt)
                    .HasColumnName("jwt")
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasColumnName("telefono")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.TipoRol).HasColumnName("tipoRol");

                entity.Property(e => e.Usuario)
                    .IsRequired()
                    .HasColumnName("usuario")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VPsCliente>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Ps_Cliente");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnName("apellido")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Cedula)
                    .IsRequired()
                    .HasColumnName("cedula")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Correo)
                    .IsRequired()
                    .HasColumnName("correo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Telefono)
                    .IsRequired()
                    .HasColumnName("telefono")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.TipoRol).HasColumnName("tipoRol");

                entity.Property(e => e.Usuario)
                    .IsRequired()
                    .HasColumnName("usuario")
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VVtMostrar>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("V_Vt_Mostrar");

                entity.Property(e => e.Admin)
                    .IsRequired()
                    .HasColumnName("admin")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Cliente)
                    .IsRequired()
                    .HasColumnName("cliente")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FechaVenta)
                    .HasColumnName("fechaVenta")
                    .HasColumnType("datetime");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdUsuarioAdmin).HasColumnName("idUsuarioAdmin");

                entity.Property(e => e.IdUsuarioCliente).HasColumnName("idUsuarioCliente");

                entity.Property(e => e.Total).HasColumnName("total");
            });

            modelBuilder.Entity<Venta>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FechaVenta)
                    .HasColumnName("fechaVenta")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdEstadoVenta).HasColumnName("idEstadoVenta");

                entity.Property(e => e.IdUsuarioAdmin).HasColumnName("idUsuarioAdmin");

                entity.Property(e => e.IdUsuarioCliente).HasColumnName("idUsuarioCliente");

                entity.HasOne(d => d.IdEstadoVentaNavigation)
                    .WithMany(p => p.VentaIdEstadoVentaNavigation)
                    .HasForeignKey(d => d.IdEstadoVenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Venta_Estado");

                entity.HasOne(d => d.IdUsuarioAdminNavigation)
                    .WithMany(p => p.VentaIdUsuarioAdminNavigation)
                    .HasForeignKey(d => d.IdUsuarioAdmin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Venta_Usuario");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
