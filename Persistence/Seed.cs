using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }


            if(!context.Activities.Any()) return;
            
                var activities = new List<Activities>
                {
                    new Activities
                    {
                        Title = "Past Activities 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Descriptionle = "Activities 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                    },
                    new Activities
                    {
                        Title = "Past Activities 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Descriptionle = "Activities 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        
                    },
                    new Activities
                    {
                        Title = "Future Activities 1",
                        Date = DateTime.Now.AddMonths(1),
                        Descriptionle = "Activities 1 month in future",
                        Category = "music",
                        City = "London",
                        Venue = "Wembly Stadium",
                        
                    },
                    new Activities
                    {
                        Title = "Future Activities 2",
                        Date = DateTime.Now.AddMonths(2),
                        Descriptionle = "Activities 2 months in future",
                        Category = "food",
                        City = "London",
                        Venue = "Jamies Italian",
                        
                    },
                    new Activities
                    {
                        Title = "Future Activities 3",
                        Date = DateTime.Now.AddMonths(3),
                        Descriptionle = "Activities 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        
                    },
                    new Activities
                    {
                        Title = "Future Activities 4",
                        Date = DateTime.Now.AddMonths(4),
                        Descriptionle = "Activities 4 months in future",
                        Category = "culture",
                        City = "London",
                        Venue = "British Museum",
                       
                    },
                    new Activities
                    {
                        Title = "Future Activities 5",
                        Date = DateTime.Now.AddMonths(5),
                        Descriptionle = "Activities 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                        
                    },
                    new Activities
                    {
                        Title = "Future Activities 6",
                        Date = DateTime.Now.AddMonths(6),
                        Descriptionle = "Activities 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena",
                       
                    },
                    new Activities
                    {
                        Title = "Future Activities 7",
                        Date = DateTime.Now.AddMonths(7),
                        Descriptionle = "Activities 7 months in future",
                        Category = "travel",
                        City = "Berlin",
                        Venue = "All",
                         
                    },
                    new Activities
                    {
                        Title = "Future Activities 8",
                        Date = DateTime.Now.AddMonths(8),
                        Descriptionle = "Activities 8 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
