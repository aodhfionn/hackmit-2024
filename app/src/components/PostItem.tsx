import './PostItem.css';
import { PostItemProps } from "../lib/interfaces";



export default function PostItem(props: PostItemProps) {
    return (
        <div className="post-frame">
            <h1 className="post-title"> {props.title} </h1>

            <h4 className="post-location"> {props.location_city}, {props.location_state} </h4>

            <h3 className="post-author"> {props.author} </h3>

            <p className="post-description"> {props.description} </p>
        </div>
    )
}