export interface Post {
    id: number;
    title: string;
    description: string;
}

export interface PostCreate {
    title: string;
    description: string;
}

export interface VideoCreate {
    videoUrl: string;
    title: string;
}

export interface PostView {
    title: string;
}

export interface PostUpdate {
    id?: number;
    title?: string;
    description?: string;
    isVisible?: boolean;
}

export interface PostRepository {
    create(data: PostCreate): Promise<Post>
}