import {Highlight} from "react-instantsearch";

export const Hit = ({hit}) => {
    return (
        <article>
            <img src={hit.images[0]}/>
            <div className="hit-title">
                <Highlight attribute="title" hit={hit}/>
            </div>
            <div className="hit-description">
                <Highlight attribute="description" hit={hit}/>
            </div>
            <div className="hit-category.name">
                <Highlight attribute="category.name" hit={hit}/>
            </div>
        </article>
    );
};