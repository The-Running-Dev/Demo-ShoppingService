import { Season } from './season.enum';

export class WardrobeItem {
    Season: Season;

    Name: string;

    constructor(season: Season, name: string) {
        this.Season = season;
        this.Name = name;
    }
}