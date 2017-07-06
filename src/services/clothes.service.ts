import { WardrobeItem } from '../models/wardrobe-item.model';
import { AutumnItem, SpringItem, SummerItem, WinterItem } from '../models/season-Items';

export class ClothesService {
    public GetSpringItem(): WardrobeItem {
        return new SpringItem(this.GetRandomSeasonItem(SpringItem))
    }

    public GetSummerItem(): WardrobeItem {
        return new SummerItem(this.GetRandomSeasonItem(SummerItem))
    }

    public GetAutumnItem(): WardrobeItem {
        return new AutumnItem(this.GetRandomSeasonItem(AutumnItem))
    }

    public GetWinterItem(): WardrobeItem {
        return new WinterItem(this.GetRandomSeasonItem(WinterItem))
    }

    public GetRandomSeasonItem(seasonItemEnum: any): string {
        let enumLength = (Object.keys(seasonItemEnum).length / 2) - 1;
        var item = Math.floor(Math.random() * enumLength) + 0;

        return seasonItemEnum[item];
    }
}