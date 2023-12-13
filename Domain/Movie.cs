namespace Domain;

public class Movie
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string DateOfRelease { get; set; }
    public string? Creator { get; set; }
    public string CoverPhoto { get; set; }
}