export interface Hero {
    id: string;
    name: string;
    fullname: string;
    firstAppearance?: string;
    publisher?: string;
    work?: string;
    slug: string;
    imageUrl: string;
    powerstats?: {
        intelligence: number;
        speed: number;
        power: number;
        combat: number;
    };
}