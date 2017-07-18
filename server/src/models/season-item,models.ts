import { WardrobeItem } from './wardrobe-item.model';
import { Season } from './season.enum';

export class SpringItem extends WardrobeItem {
    constructor(name: string) {
        super(Season.Spring, name);
    }
}

export class SummerItem extends WardrobeItem {
    constructor(name: string) {
        super(Season.Summer, name);
    }
}

export class AutumnItem extends WardrobeItem {
    constructor(name: string) {
        super(Season.Autumn, name);
    }
}

export class WinterItem extends WardrobeItem {
    constructor(name: string) {
        super(Season.Winter, name);
    }
}