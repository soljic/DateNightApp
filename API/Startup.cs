using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Middleware;
using API.Services;
using API.SignalR;
using Application.Activity;
using Application.Core;
using Domain;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Infrastructure.Email;
using Application.Interfaces;
using Infrastructure.Security;
using Infrastructure.Photos;
using FluentValidation;
using StackExchange.Redis;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
          services.AddControllers(opt => 
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            });
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            var connectionString = Configuration.GetConnectionString("DefaultConnecton");
            services.AddDbContext<DataContext>(opt =>{
                opt.UseSqlite(connectionString);
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DateNightApp", Version = "v1" });
            });

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy  =>
                {
                    policy.AllowAnyHeader().AllowCredentials().WithExposedHeaders("www-authenticate", "Pagination").AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            
            services.AddMediatR(cfg => 
            {
                cfg.RegisterServicesFromAssemblyContaining<Program>();
                cfg.RegisterServicesFromAssembly(typeof(Create).Assembly);

            });
              //services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);
              services.AddIdentityCore<AppUser>(opt => {
                  opt.Password.RequireNonAlphanumeric = false;
                  opt.SignIn.RequireConfirmedEmail = true;
              })
              .AddEntityFrameworkStores<DataContext>()
              .AddSignInManager<SignInManager<AppUser>>()
              .AddDefaultTokenProviders();
              var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
              services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(opt =>{
                  opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                  {
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = key,
                      ValidateIssuer = false,
                      ValidateAudience = false,
                      ValidateLifetime = true,
                      ClockSkew = TimeSpan.Zero
                  };
                  opt.Events = new JwtBearerEvents
                                     {
                                         OnMessageReceived = context =>
                                         {
                                             var accessToken = context.Request.Query["access_token"];
                                             var path = context.HttpContext.Request.Path;
                                             if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat") || !string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/notification"))))
                                             {
                                                 context.Token = accessToken;
                                             }
                                          
                                             return Task.CompletedTask;
                                         }
                                     };
              });
                services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });
            services.AddSingleton<IConnectionMultiplexer>(c => 
            {
                var configuration = ConfigurationOptions.Parse(Configuration.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });
           
            //services.Configure<MediatRServiceConfiguration>(cfg => {
            //    // Ovdje mo�ete postaviti razne postavke za MediatR
            //    cfg.Lifetime = ServiceLifetime.Scoped;
            //    cfg.RegisterServicesFromAssemblyContaining<List.Handler>();
            //});


            services.AddAutoMapper(typeof(API.Helpers.MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<EmailSender>();
            services.AddScoped<TokenService>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
            services.AddSignalR();
            // services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            // app.UseHttpsRedirection();
            // app.UseMvc(); 
            if (env.IsDevelopment()) 
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseRouting();

            app.UseCors("CorsPolicy");


            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwagger();
            app.UseSwaggerUI();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("v1/swagger.json", "DateNightApp");
            //});

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapHub<NotificatonHub>("/notification");
            });
             


           
        }
    }
}
