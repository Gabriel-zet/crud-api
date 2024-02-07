
export interface Category {
    id: number;
    title: string;
    description: string;
}

export interface CategoryCreate {
    title: string;
    description: string;
}

export interface CategoryView {
    title: string;
}

export interface CategoryRepository {
    create(data: CategoryCreate): Promise<Category>
}