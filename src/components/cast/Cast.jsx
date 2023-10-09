import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadingImage/img";
import avatar from '../.././assets/avatar.png'

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                    {
                        data?.map((items)=>{
                            let imgUrl = items.profile_path ? url.porfile + items.profile_path : 'avatar' 
                            return(
                                <div key={items.id} className="listItem">
                                <div className="profileImg">
                                    <Img src={imgUrl}/>
                                </div>
                                <div className="name">{items.name}</div>
                                <div className="character">{items.character}</div>
                                </div>
                            )
                        })
                    }
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
