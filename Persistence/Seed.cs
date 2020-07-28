using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Activities.Any())
            {
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
                        Venue = "Louvre",
                    },
                    new Activities
                    {
                        Title = "Future Activities 1",
                        Date = DateTime.Now.AddMonths(1),
                        Descriptionle = "Activities 1 month in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    },
                    new Activities
                    {
                        Title = "Future Activities 2",
                        Date = DateTime.Now.AddMonths(2),
                        Descriptionle = "Activities 2 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena",
                    },
                    new Activities
                    {
                        Title = "Future Activities 3",
                        Date = DateTime.Now.AddMonths(3),
                        Descriptionle = "Activities 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Another pub",
                    },
                    new Activities
                    {
                        Title = "Future Activities 4",
                        Date = DateTime.Now.AddMonths(4),
                        Descriptionle = "Activities 4 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Yet another pub",
                    },
                    new Activities
                    {
                        Title = "Future Activities 5",
                        Date = DateTime.Now.AddMonths(5),
                        Descriptionle = "Activities 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Just another pub",
                    },
                    new Activities
                    {
                        Title = "Future Activities 6",
                        Date = DateTime.Now.AddMonths(6),
                        Descriptionle = "Activities 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "Roundhouse Camden",
                    },
                    new Activities
                    {
                        Title = "Future Activities 7",
                        Date = DateTime.Now.AddMonths(7),
                        Descriptionle = "Activities 2 months ago",
                        Category = "travel",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                    },
                    new Activities
                    {
                        Title = "Future Activities 8",
                        Date = DateTime.Now.AddMonths(8),
                        Descriptionle = "Activities 8 months in future",
                        Category = "film",
                        City = "London",
                        Venue = "Cinema",
                    }
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();
            };
            
        }
    }
}