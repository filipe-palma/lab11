export interface Product {
    id: number;
    title: string;
    image: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}