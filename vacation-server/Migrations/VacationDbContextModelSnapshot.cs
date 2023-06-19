﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace vacation_server.Migrations
{
    [DbContext(typeof(VacationDbContext))]
    partial class VacationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .HasColumnType("longtext");

                    b.HasKey("EmployeeId");

                    b.ToTable("Employees", (string)null);
                });

            modelBuilder.Entity("Vacation", b =>
                {
                    b.Property<int>("VacationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("DateTimeFrom")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateTimeTo")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("VacationId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Vacations", (string)null);
                });

            modelBuilder.Entity("Vacation", b =>
                {
                    b.HasOne("Employee", "Employee")
                        .WithMany("Vacations")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("Employee", b =>
                {
                    b.Navigation("Vacations");
                });
#pragma warning restore 612, 618
        }
    }
}
