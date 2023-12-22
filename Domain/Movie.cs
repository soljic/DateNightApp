namespace Domain;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string DateOfRelease { get; set; }
    public string Director { get; set; }
    public double Rating { get; set; }
    public List<Actor> Cast { get; set; }
    public List<string> Genres { get; set; }

    public string MediaType { get; set; }
    public string CoverPhoto { get; set; }
}