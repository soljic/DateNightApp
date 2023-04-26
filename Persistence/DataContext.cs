﻿ using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Reflection.Emit;
using Domain.OrderAggregate;
using System.Reflection;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {      
        }

        public DbSet<Value> Values { get; set; }

         public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

         public DbSet<Activities> Activities { get; set; }

         public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Domain.Address> Addresses { get; set; }
        public DbSet<QuizQuestion> QuizQuestions { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
          {
                base.OnModelCreating(builder);

            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var entityType in builder.Model.GetEntityTypes())
                {
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

                    foreach (var property in properties)
                    {
                        builder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                    }
                }
            }

            builder.Entity<Order>(entity =>
            {
                entity.OwnsOne(o => o.ShipToAddress, a =>
                {
                    a.WithOwner();
                });

                entity.Navigation(a => a.ShipToAddress).IsRequired();

                entity.Property(s => s.Status)
               .HasConversion(
                   o => o.ToString(),
                   o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o)
               );
                entity.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<Product>(entity =>
            {
                entity.Property(p => p.Id).IsRequired();
                entity.Property(p => p.Name).IsRequired().HasMaxLength(100);
                entity.Property(p => p.Description).IsRequired();
                entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
                entity.Property(p => p.PictureUrl).IsRequired();
                entity.HasOne(p => p.ProductBrand).WithMany()
                    .HasForeignKey(p => p.ProductBrandId);
                entity.HasOne(p => p.ProductType).WithMany()
                    .HasForeignKey(p => p.ProductTypeId);

            });


            builder.Entity<OrderItem>(entity =>
            {
                entity.OwnsOne(c => c.ItemOrdered).WithOwner();
                entity.Property(i => i.Price)
                .HasColumnType("decimal(18,2)");

            });

            builder.Entity<DeliveryMethod>(entity =>
            {
                entity.Property(d => d.Price)
                .HasColumnType("decimal(18,2)");
            });

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            builder.Entity<Question>()
           .Property(q => q.Choices)
           .HasConversion(
               v => string.Join(',', v),
               v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.Activity)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.ActivityId);

            builder.Entity<Comment>()
             .HasOne(a => a.Activity)
             .WithMany(c => c.Comments)
             .OnDelete(DeleteBehavior.Cascade);


                      builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);

            });


            builder.Entity<Notification>()
             .HasOne(a => a.Author);

            builder.Entity<Notification>()
             .HasOne(a => a.Receiever)
             .WithMany(c => c.Notifications);

        }
    }
}
