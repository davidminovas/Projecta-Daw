import { Likes } from "../interfaces/like/like";



export function isValidLike(like: Likes): boolean {


    if (like.user === null || like.track === null || like.liketrack === null) {
        return false;
    }

    return true;
}